import { useEffect, useRef } from "react";
import { prefersReducedMotion, isMobileViewport } from "@/lib/gsap";

type DepthParallaxProps = {
  /** Color/photo texture URL. */
  image: string;
  /** Depth map URL (luminance drives displacement; darker = nearer here). */
  depth: string;
  /** Displacement strength in UV units (0.01–0.08 feels natural). */
  amount?: number;
  className?: string;
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2 uMouse;     // -1..1 smoothed pointer
uniform vec2 uRes;       // canvas pixels
uniform vec2 uImg;       // image pixels
uniform float uAmount;

vec2 coverUv(vec2 uv) {
  float ratio = (uRes.x / uRes.y) / (uImg.x / uImg.y);
  if (ratio > 1.0) {
    uv.y = (uv.y - 0.5) / ratio + 0.5;
  } else {
    uv.x = (uv.x - 0.5) * ratio + 0.5;
  }
  return uv;
}

void main() {
  // Cover-fit, with a tiny inset zoom so displaced edges never reveal gaps.
  vec2 uv = coverUv(vUv);
  uv = (uv - 0.5) * 0.94 + 0.5;

  float d = dot(texture2D(uDepth, uv).rgb, vec3(0.299, 0.587, 0.114));
  // Near elements (low luminance / blue foreground) parallax the most.
  float strength = 1.0 - d;

  vec2 offset = uMouse * strength * uAmount;
  vec3 color = texture2D(uImage, uv - offset).rgb;
  gl_FragColor = vec4(color, 1.0);
}
`;

function loadTexture(gl: WebGLRenderingContext, url: string): Promise<{ tex: WebGLTexture; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      resolve({ tex, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export function DepthParallax({ image, depth, amount = 0.045, className }: DepthParallaxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Reduced motion: skip WebGL entirely, the <img> fallback stays visible.
    if (prefersReducedMotion()) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    let raf = 0;
    let disposed = false;
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const mobile = isMobileViewport();

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uImage = gl.getUniformLocation(program, "uImage");
    const uDepth = gl.getUniformLocation(program, "uDepth");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uRes = gl.getUniformLocation(program, "uRes");
    const uImg = gl.getUniformLocation(program, "uImg");
    const uAmount = gl.getUniformLocation(program, "uAmount");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.clientWidth * dpr;
      const h = canvas!.clientHeight * dpr;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    Promise.all([loadTexture(gl, image), loadTexture(gl, depth)]).then(([imgTex, depthTex]) => {
      if (disposed) return;
      if (fallbackRef.current) fallbackRef.current.style.opacity = "0";

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imgTex.tex);
      gl.uniform1i(uImage, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, depthTex.tex);
      gl.uniform1i(uDepth, 1);
      gl.uniform2f(uImg, imgTex.w, imgTex.h);
      gl.uniform1f(uAmount, mobile ? amount * 0.4 : amount);

      if (!mobile) {
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerleave", onLeave);
      }

      const render = () => {
        if (disposed) return;
        mouse.x += (target.x - mouse.x) * 0.06;
        mouse.y += (target.y - mouse.y) * 0.06;
        resize();
        gl.uniform2f(uRes, canvas!.width, canvas!.height);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        raf = requestAnimationFrame(render);
      };
      render();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [image, depth, amount]);

  return (
    <div className={className}>
      <img
        ref={fallbackRef}
        src={image}
        alt="Berggipfel im Morgenlicht"
        className="absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700"
        fetchPriority="high"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
