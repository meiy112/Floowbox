"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type FrontendAudioBoxProps = {
  audioBlob: Blob | null;
  waveSurferRef: React.RefObject<WaveSurfer | null>;
};

const AudioBox = ({ audioBlob, waveSurferRef }: FrontendAudioBoxProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (waveformRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        cursorWidth: 1,
        container: waveformRef.current,
        backend: "WebAudio",
        height: 80,
        progressColor: "#FE6E00",
        waveColor: "#FF0072",
        cursorColor: "transparent",
      });

      waveSurferRef.current.on("ready", () => {
        setTotalTime(waveSurferRef.current?.getDuration() || 0);
      });

      waveSurferRef.current.on("audioprocess", () => {
        setCurrentTime(waveSurferRef.current?.getCurrentTime() || 0);
      });
    }

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (audioBlob && waveSurferRef.current) {
      const audioUrl = audioBlob
        ? URL.createObjectURL(audioBlob)
        : "./test.mp3";
      waveSurferRef.current.load(audioUrl);
    }
  }, [audioBlob]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <div className="text-sm">{currentTime.toFixed(1)}s</div>
        <div ref={waveformRef} className="w-full h-16" />
        <div className="text-sm">{totalTime.toFixed(1)}s</div>
      </div>
    </div>
  );
};

export default AudioBox;
