import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Camera,
  CameraOff,
  Sparkles,
  AlertCircle,
  Eye,
  Activity,
  RefreshCw,
  SwitchCamera,
  CheckCircle2,
  Sliders,
  Sun,
  Palette,
  Volume2,
  Move,
  Film,
} from 'lucide-react';
import { VirtualSeat } from '../types';
import { autonomousMonetizationEngine } from '../services/autonomousMonetizationEngine';
import { audioStreamEngine } from '../services/audioStreamEngine';

export type VideoFilterMode = 'studio_radiance' | 'low_light_boost' | 'cinema_vivid' | 'skin_clarity' | 'natural_raw';
export type AspectRatioMode = '16/9' | '16/10' | '21/9' | '4/5';

interface Props {
  seat: VirtualSeat;
  isSpeaking: boolean;
  onToggleVideo?: () => void;
  className?: string;
  enableControls?: boolean;
  autoStartCamera?: boolean;
  defaultAspectRatio?: AspectRatioMode;
  isSpotlightStage?: boolean;
}

export const InteractiveVideoFeed: React.FC<Props> = ({
  seat,
  isSpeaking,
  onToggleVideo,
  className = '',
  enableControls = true,
  autoStartCamera = false,
  defaultAspectRatio = '16/9',
  isSpotlightStage = false,
}) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Zoom and pan state (+ and - zoom controls)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Display aspect ratio and dimension mode
  const [aspectRatio, setAspectRatio] = useState<AspectRatioMode>(defaultAspectRatio);

  // Video image quality filter
  const [filterMode, setFilterMode] = useState<VideoFilterMode>('studio_radiance');
  const [showFilterPicker, setShowFilterPicker] = useState<boolean>(false);

  // Camera acquisition state
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRealCameraActive, setIsRealCameraActive] = useState<boolean>(false);
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isRequestingCamera, setIsRequestingCamera] = useState<boolean>(false);

  // CSS Filter values mapping for high-end studio video rendering
  const filterStyles: Record<VideoFilterMode, string> = {
    studio_radiance: 'contrast(1.06) saturate(1.10) brightness(1.02)',
    low_light_boost: 'brightness(1.18) contrast(1.12) saturate(1.06)',
    cinema_vivid: 'contrast(1.15) saturate(1.25) brightness(1.01)',
    skin_clarity: 'brightness(1.04) contrast(1.02) saturate(1.07)',
    natural_raw: 'none',
  };

  const filterLabels: Record<VideoFilterMode, { title: string; desc: string }> = {
    studio_radiance: { title: 'Studio HD Radiance', desc: 'የጠራ ስቱዲዮ ብርሃንና ጥራት' },
    low_light_boost: { title: 'Low-Light Boost', desc: 'ለጨለማ ቦታ የተስተካከለ ብርሃን' },
    cinema_vivid: { title: 'Cinema Vivid', desc: 'ደማቅ ሲኒማቲክ ቀለሞች' },
    skin_clarity: { title: 'Soft Skin Clarity', desc: 'የለሰለሰ የፊት ጥራት' },
    natural_raw: { title: 'Natural Raw', desc: 'ያልተስተካከለ የተፈጥሮ እይታ' },
  };

  // Safely assign stream to video element whenever video element or stream updates
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoElementRef.current = node;
    if (node && streamRef.current) {
      if (node.srcObject !== streamRef.current) {
        node.srcObject = streamRef.current;
      }
      node.play().catch((err) => {
        console.warn('Autoplay caught on interaction:', err);
      });
    }
  }, []);

  // Multi-tier 1080p 60FPS camera acquisition function
  const startCamera = useCallback(async (preferredFacing: 'user' | 'environment' = 'user') => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('በዚህ ብሮውዘር ላይ የካሜራ ድጋፍ የለም (Camera API not supported)');
      setIsRealCameraActive(false);
      return;
    }

    setIsRequestingCamera(true);
    setCameraError(null);

    // Stop existing stream tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    let stream: MediaStream | null = null;

    // Tier 1: Studio HD 1080p @ 60FPS capture
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: preferredFacing },
          width: { ideal: 1920, max: 3840 },
          height: { ideal: 1080, max: 2160 },
          frameRate: { ideal: 60, max: 60 },
        },
        audio: false,
      });
    } catch (err1) {
      console.warn('Camera Tier 1 (1080p60) failed, trying Tier 2 (720p):', err1);
      // Tier 2: 720p HD capture fallback
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: preferredFacing,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (err2) {
        console.warn('Camera Tier 2 failed, trying Tier 3 universal fallback:', err2);
        // Tier 3: Universal video device
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        } catch (err3: any) {
          console.warn('All camera tiers failed:', err3);
          const msg =
            err3?.name === 'NotAllowedError' || err3?.name === 'PermissionDeniedError'
              ? 'የካሜራ ፈቃድ ተከልክሏል - እባክዎ በብሮውዘሩ አድራሻ አሞሌ ላይ የካሜራ ፈቃድ ይስጡ'
              : 'ካሜራውን ማግኘት አልተቻለም (Simulated Live Video Active)';
          setCameraError(msg);
          setIsRealCameraActive(false);
          setIsRequestingCamera(false);
          return;
        }
      }
    }

    if (stream) {
      streamRef.current = stream;
      setIsRealCameraActive(true);
      setIsRequestingCamera(false);
      setCameraError(null);

      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
        videoElementRef.current.play().catch(() => {});
      }

      // Record activity in background autonomous monetization engine
      autonomousMonetizationEngine.recordMediaActivity(1, 45);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoElementRef.current) {
      videoElementRef.current.srcObject = null;
    }
    setIsRealCameraActive(false);
    setIsRequestingCamera(false);
  }, []);

  // Flip camera between front and rear
  const handleFlipCamera = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    await startCamera(nextMode);
  };

  // Manage camera lifecycle
  useEffect(() => {
    const shouldRunCamera = (seat.isLocalUser || autoStartCamera) && seat.isVideoActive;

    if (shouldRunCamera) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [seat.isLocalUser, seat.isVideoActive, autoStartCamera, startCamera, stopCamera]);

  // Keep stream synced with video element
  useEffect(() => {
    if (isRealCameraActive && videoElementRef.current && streamRef.current) {
      if (videoElementRef.current.srcObject !== streamRef.current) {
        videoElementRef.current.srcObject = streamRef.current;
      }
      videoElementRef.current.play().catch(() => {});
    }
  }, [isRealCameraActive]);

  // High-DPI 60FPS Simulated Studio Backdrop with celestial rings
  useEffect(() => {
    if (isRealCameraActive || !seat.isVideoActive) return;

    let animationFrameId: number;
    let t = 0;

    const renderCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Dark luxury orbital backdrop
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );
      gradient.addColorStop(0, '#0a1a36');
      gradient.addColorStop(0.5, '#050c18');
      gradient.addColorStop(1, '#02050b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Fine precision studio coordinate grid
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.07)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width / 2;
      const cy = height / 2 - 12;
      const baseRadius = isSpotlightStage ? 68 : 50;
      const pulse = isSpeaking ? Math.sin(t * 0.18) * 10 : Math.sin(t * 0.06) * 3;

      // Outer dotted celestial orbit matching Oneworld brand emblem
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius + 36 + pulse * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Elliptical equatorial ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((t * 0.008) % (Math.PI * 2));
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius + 28, baseRadius * 0.45, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isSpeaking ? 'rgba(52, 211, 153, 0.6)' : 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Central glowing orb
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius + pulse * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = isSpeaking ? 'rgba(52, 211, 153, 0.9)' : 'rgba(245, 158, 11, 0.7)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Avatar core
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0a1324';
      ctx.fill();
      ctx.clip();

      // Initial letter in center
      ctx.fillStyle = isSpeaking ? '#34d399' : '#fbbf24';
      ctx.font = `bold ${isSpotlightStage ? '48px' : '36px'} Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(seat.name.charAt(0) || 'U', cx, cy);
      ctx.restore();

      // Central gold star emblem
      const starY = cy - baseRadius * 0.35;
      ctx.fillStyle = isSpeaking ? '#34d399' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, starY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Speech audio reactivity bar chart at bottom
      if (isSpeaking) {
        const barCount = 24;
        const barWidth = 6;
        const gap = 4;
        const startX = cx - (barCount * (barWidth + gap)) / 2;
        for (let i = 0; i < barCount; i++) {
          const h = Math.abs(Math.sin(t * 0.22 + i * 0.35)) * 36 + 8;
          ctx.fillStyle = '#34d399';
          ctx.beginPath();
          ctx.roundRect(startX + i * (barWidth + gap), height - 28 - h, barWidth, h, 3);
          ctx.fill();
        }
      }

      t += 1;
      animationFrameId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRealCameraActive, seat.isVideoActive, isSpeaking, seat.name, isSpotlightStage]);

  // Zoom controls (+ and -) with 0.25 steps up to 4.0x
  const handleZoomIn = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel((prev) => Math.min(4.0, Number((prev + 0.25).toFixed(2))));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel((prev) => {
      const next = Math.max(1.0, Number((prev - 0.25).toFixed(2)));
      if (next === 1.0) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleSetPresetZoom = (level: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel(level);
    if (level === 1.0) setPanOffset({ x: 0, y: 0 });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  // Double click to toggle quick zoom 1.0x <-> 2.0x
  const handleDoubleClick = () => {
    if (zoomLevel > 1.0) {
      handleResetZoom();
    } else {
      setZoomLevel(2.0);
    }
  };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1.0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1.0) return;
    const maxPan = (zoomLevel - 1) * 160;
    const nextX = Math.max(-maxPan, Math.min(maxPan, e.clientX - dragStart.x));
    const nextY = Math.max(-maxPan, Math.min(maxPan, e.clientY - dragStart.y));
    setPanOffset({ x: nextX, y: nextY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Aspect ratio class helper
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/10':
        return 'aspect-[16/10]';
      case '21/9':
        return 'aspect-[21/9]';
      case '4/5':
        return 'aspect-[4/5]';
      case '16/9':
      default:
        return 'aspect-video';
    }
  };

  return (
    <>
      <div
        className={`relative ${getAspectClass()} rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-2xl flex items-center justify-center select-none group/video transition-all ${
          isSpotlightStage ? 'w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px]' : 'min-h-[200px] sm:min-h-[240px]'
        } ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      >
        {seat.isVideoActive ? (
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
            {/* Visual Stream Content with CSS Zoom and Pan Transform */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                cursor: zoomLevel > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
            >
              {/* Keep video element rendered with callback ref */}
              <video
                ref={setVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isRealCameraActive ? 'block' : 'hidden'}`}
                style={{
                  transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                  filter: filterStyles[filterMode],
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
              />

              {!isRealCameraActive && (
                <canvas
                  ref={canvasRef}
                  width={960}
                  height={540}
                  className="w-full h-full object-cover"
                  style={{
                    filter: filterStyles[filterMode],
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              )}
            </div>

            {/* Top-Left Live Status Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
              <div className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isRealCameraActive ? 'LIVE HD 60FPS' : 'STUDIO SIMULATED'}</span>
              </div>

              {/* Filter Indicator Badge */}
              {filterMode !== 'natural_raw' && (
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-purple-950/80 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-purple-500/40 shadow-lg">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>{filterLabels[filterMode].title.split(' ')[0]}</span>
                </div>
              )}
            </div>

            {/* Top-Right: Zoom Level Badge & Quality Filter Trigger */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
              {zoomLevel > 1.0 && (
                <div className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-mono font-black shadow-lg flex items-center gap-1 animate-in fade-in">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{zoomLevel.toFixed(1)}x</span>
                </div>
              )}

              {/* Aspect Ratio Switcher Dropdown Button */}
              {enableControls && isSpotlightStage && (
                <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow">
                  <button
                    onClick={() => setAspectRatio('16/9')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                      aspectRatio === '16/9' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                    title="16:9 Widescreen"
                  >
                    16:9
                  </button>
                  <button
                    onClick={() => setAspectRatio('16/10')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                      aspectRatio === '16/10' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                    title="16:10 Expansive Stage"
                  >
                    16:10
                  </button>
                  <button
                    onClick={() => setAspectRatio('21/9')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                      aspectRatio === '21/9' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                    title="21:9 Ultrawide Cinema"
                  >
                    21:9
                  </button>
                </div>
              )}

              {/* Studio Filter Menu Trigger */}
              {enableControls && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFilterPicker((prev) => !prev);
                    }}
                    className={`p-1.5 rounded-xl border transition shadow-lg flex items-center gap-1 text-[10px] font-bold ${
                      showFilterPicker
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-black/80 backdrop-blur-md text-slate-200 border-slate-700 hover:border-purple-400'
                    }`}
                    title="የምስል ማሻሻያ ጥራት (Studio Filters)"
                  >
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span className="hidden sm:inline">ጥራት</span>
                  </button>

                  {/* Filter Picker Dropdown */}
                  {showFilterPicker && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-9 w-56 rounded-2xl bg-[#091322] border border-purple-500/50 p-2 shadow-2xl z-30 space-y-1 animate-in fade-in"
                    >
                      <div className="text-[10px] font-mono text-purple-300 px-2 py-1 font-bold border-b border-slate-800 flex items-center justify-between">
                        <span>የምስል ጥራት ማሻሻያ (Enhance)</span>
                        <Sparkles className="w-3 h-3 text-purple-400" />
                      </div>
                      {(Object.keys(filterLabels) as VideoFilterMode[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => {
                            setFilterMode(f);
                            setShowFilterPicker(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition flex flex-col ${
                            filterMode === f
                              ? 'bg-purple-600 text-white font-bold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="font-semibold">{filterLabels[f].title}</span>
                          <span className="text-[9px] opacity-80">{filterLabels[f].desc}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Camera Error / Permission Notice with Quick-Retry */}
            {cameraError && !isRealCameraActive && (
              <div className="absolute inset-x-3 top-12 p-3 rounded-2xl bg-black/90 border border-amber-500/50 backdrop-blur-md z-30 text-xs text-amber-200 flex flex-col gap-2 animate-in fade-in max-w-md mx-auto">
                <div className="flex items-center gap-2 font-semibold text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{cameraError}</span>
                </div>
                <button
                  onClick={() => startCamera(facingMode)}
                  className="self-start px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition shadow"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>ካሜራውን እንደገና ሞክር (Retry Camera)</span>
                </button>
              </div>
            )}

            {/* Manual Camera Trigger If Inactive and seat is active */}
            {!isRealCameraActive && !cameraError && (
              <div className="absolute inset-x-3 bottom-16 flex justify-center z-10 pointer-events-auto">
                <button
                  onClick={() => startCamera(facingMode)}
                  disabled={isRequestingCamera}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 border border-cyan-400/50 transition active:scale-95"
                >
                  <Camera className="w-4 h-4 text-cyan-200" />
                  <span>{isRequestingCamera ? 'ካሜራ እየተገናኘ...' : 'የፊት ካሜራህን አገናኝ (Connect HD Camera)'}</span>
                </button>
              </div>
            )}

            {/* Prominent High-Visibility Video Zoom Controls (+ እና -) & Stage Controls Bar */}
            {enableControls && (
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-20 flex-wrap gap-2">
                {/* PROMINENT ZOOM CONTROLS WITH VISIBLE + AND - BUTTONS */}
                <div className="flex items-center gap-1.5 bg-black/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/90 shadow-2xl pointer-events-auto">
                  {/* Zoom Out (-) Button */}
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1.0}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition font-bold text-xs active:scale-95"
                    title="የዙም መቀነሻ (Zoom Out -)"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-sm leading-none font-black">-</span>
                  </button>

                  {/* Zoom Value Display */}
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-black min-w-[42px] text-center border border-amber-500/30">
                    {zoomLevel.toFixed(1)}x
                  </span>

                  {/* Zoom In (+) Button */}
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 4.0}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition font-bold text-xs active:scale-95"
                    title="የዙም መጨመሪያ (Zoom In +)"
                    aria-label="Zoom In"
                  >
                    <span className="font-mono text-sm leading-none font-black">+</span>
                    <ZoomIn className="w-4 h-4 text-amber-400" />
                  </button>

                  {/* Quick Zoom Presets */}
                  <div className="hidden sm:flex items-center gap-1 border-l border-slate-800 pl-1.5">
                    {[1.0, 1.5, 2.0, 3.0].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={(e) => handleSetPresetZoom(lvl, e)}
                        className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold transition ${
                          zoomLevel === lvl
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {lvl.toFixed(1)}x
                      </button>
                    ))}
                  </div>

                  {zoomLevel > 1.0 && (
                    <button
                      onClick={handleResetZoom}
                      className="p-1.5 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition text-[10px] font-mono border-l border-slate-800 pl-2"
                      title="ወደ ነበረበት መልስ (Reset Zoom)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Flip Camera & Fullscreen Theater Button */}
                <div className="flex items-center gap-1.5 bg-black/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/90 shadow-2xl pointer-events-auto">
                  {isRealCameraActive && (
                    <button
                      onClick={handleFlipCamera}
                      className="p-2 rounded-xl text-cyan-300 hover:text-white hover:bg-slate-800 transition active:scale-95"
                      title={facingMode === 'user' ? 'የኋላ ካሜራ (Switch to Back)' : 'የፊት ካሜራ (Switch to Front)'}
                    >
                      <SwitchCamera className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCinemaModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition active:scale-95 text-xs font-semibold"
                    title="ሙሉ ማያ ሲኒማ እይታ (Cinema Mode)"
                    aria-label="Maximize Video"
                  >
                    <Maximize2 className="w-4 h-4 text-cyan-300" />
                    <span className="hidden sm:inline">ሲኒማ</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-400 p-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-300 text-2xl font-bold shadow-inner mb-2">
              {seat.name.charAt(0)}
            </div>
            <span className="text-xs text-slate-300 font-bold">ቪዲዮ ጠፍቷል (Video Off)</span>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5">{seat.name}</span>
            {onToggleVideo && (
              <button
                onClick={onToggleVideo}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>ቪዲዮ አብራ (Turn Camera On)</span>
              </button>
            )}
          </div>
        )}

        {/* Audio Speaking Wave Indicator */}
        {isSpeaking && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-500/40 pointer-events-none z-10 shadow-lg">
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ድምፅ ንቁ ነው (Speaking)
            </span>
            <div className="flex items-center gap-0.5">
              {[40, 90, 60, 100, 70, 85].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-emerald-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(5, h * 0.16)}px`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EXPANDED CINEMA / THEATER VIEW MODAL */}
      {isCinemaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="relative w-full max-w-5xl max-h-[95vh] bg-[#070F1D] border border-amber-500/50 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{seat.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">{seat.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                      {seat.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {seat.nationality} • {seat.gender}, {seat.age} yrs • HD 60FPS
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCinemaModalOpen(false)}
                className="p-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition"
                title="Close Cinema Mode"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Giant Cinema Video Surface */}
            <div className="relative w-full aspect-video min-h-[340px] sm:min-h-[480px] rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center shadow-2xl">
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                }}
              >
                {isRealCameraActive ? (
                  <video
                    autoPlay
                    playsInline
                    muted
                    ref={(el) => {
                      if (el && streamRef.current) el.srcObject = streamRef.current;
                    }}
                    className="w-full h-full object-contain"
                    style={{
                      transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                      filter: filterStyles[filterMode],
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                ) : (
                  <canvas
                    ref={(el) => {
                      if (el && canvasRef.current) {
                        const ctx = el.getContext('2d');
                        if (ctx) ctx.drawImage(canvasRef.current, 0, 0, el.width, el.height);
                      }
                    }}
                    width={1280}
                    height={720}
                    className="w-full h-full object-contain"
                    style={{
                      filter: filterStyles[filterMode],
                    }}
                  />
                )}
              </div>
            </div>

            {/* High-visibility Zoom & Filter Toolbar in Cinema Mode */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Visible + and - controls */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-700">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1.0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white flex items-center gap-1 text-xs font-bold disabled:opacity-30 transition"
                  >
                    <ZoomOut className="w-4 h-4 text-amber-400" />
                    <span>Zoom Out (-)</span>
                  </button>

                  <span className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-black">
                    {zoomLevel.toFixed(1)}x
                  </span>

                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 4.0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white flex items-center gap-1 text-xs font-bold disabled:opacity-30 transition"
                  >
                    <ZoomIn className="w-4 h-4 text-amber-400" />
                    <span>Zoom In (+)</span>
                  </button>
                </div>

                {zoomLevel > 1.0 && (
                  <button
                    onClick={handleResetZoom}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset (1.0x)</span>
                  </button>
                )}

                {isRealCameraActive && (
                  <button
                    onClick={handleFlipCamera}
                    className="px-3 py-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <SwitchCamera className="w-4 h-4" />
                    <span>{facingMode === 'user' ? 'የኋላ ካሜራ' : 'የፊት ካሜራ'}</span>
                  </button>
                )}
              </div>

              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>48kHz Studio Master • Hardware Accelerated WebGL/CSS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
