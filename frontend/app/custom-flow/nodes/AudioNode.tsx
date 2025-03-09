"use client";
import { AnimatePresence } from "framer-motion";
import "./AudioNode.css";
import React, { useEffect, useRef, useState } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";

type AudioBoxNodeProps = {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
};

const AudioNode = ({ data, isConnectable, id }: AudioBoxNodeProps) => {
  const { isFrontend } = data;
  const { registerNode } = useNodeConnectionContext();

  const [audioBlob, setAudioBlob] = useState(null);

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "audio",
    process: async (input: any) => {
      console.log("Audio box processing. Input:", input);
      setAudioBlob(input);
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, [id, registerNode, nodeDefinition]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "6em", zIndex: 5 }}
    >
      <div className={isFrontend ? "h-full" : "h-full invisible"}>
        <FrontendAudioBox audioBlob={audioBlob} />
      </div>
      <BackendAudioBox
        isConnectable={isConnectable}
        id={id}
        hidden={isFrontend}
      />
    </div>
  );
};

const FrontendAudioBox = ({ audioBlob }: { audioBlob: Blob | null }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setBlobUrl(url);
      wavesurfer && wavesurfer.play();

      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

  const onReady = (ws: any) => {
    ws.play();
    setIsPlaying(true);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="bg-white audio-box__frontend-container audio-box h-full w-[450px]">
      <div className="gap-y-[0.8em] px-[1.7em] audio-box__frontend rounded-[50em] overflow-hidden flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-center gap-x-[1.5em]">
          <button className="cursor-pointer" onClick={onPlayPause}>
            {isPlaying ? (
              <img src="./images/pause.svg" />
            ) : (
              <img src="./images/play.svg" />
            )}
          </button>
          {blobUrl ? (
            <WavesurferPlayer
              width={340}
              waveColor={"#CECCD7"}
              progressColor={"#FF0072"}
              url={blobUrl}
              onReady={onReady}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              barWidth={3}
              barRadius={3}
              height={50}
            />
          ) : (
            <div className="w-[340px] flex flex-col gap-y-[0.2em]">
              <span className="text-[1rem] font-medium">No Audio Found</span>
              <span className="text-[#CECCD7]">
                When an audio is ready, it will play here.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BackendAudioBox = ({
  isConnectable,
  id,
  hidden,
}: {
  isConnectable: boolean;
  id: string;
  hidden: boolean;
}) => {
  return (
    <div
      className="absolute inset-0 audio-box__backend-container audio-box h-full flex items-center justify-center w-[450px]"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <BackendBox type="audio" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default AudioNode;
