"use client";
import { AnimatePresence } from "framer-motion";
import "./AudioNode.css";
import React, { useEffect, useRef, useState } from "react";
import { PipelineNode } from "@/app/class/Pipeline";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import BackendBox from "@/app/components/boxes/BackendBox";
import { Pause, Play } from "lucide-react";
import AudioBox from "@/app/components/boxes/AudioBox";
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
      <AnimatePresence>
        <div className="h-full">
          {isFrontend ? (
            <FrontendAudioBox audioBlob={audioBlob} />
          ) : (
            <BackendAudioBox isConnectable={isConnectable} id={id} />
          )}
        </div>
      </AnimatePresence>
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

      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="bg-white audio-box__frontend-container audio-box h-full w-[450px]">
      <div className="gap-y-[0.8em] px-[1.7em] image-box__frontend rounded-[50em] overflow-hidden flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-center gap-x-[1.5em]">
          <button className="cursor-pointer" onClick={onPlayPause}>
            {isPlaying ? (
              <img src="./images/pause.svg" />
            ) : (
              <img src="./images/play.svg" />
            )}
          </button>
          {blobUrl && (
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
          )}
        </div>
      </div>
    </div>
  );
};

const BackendAudioBox = ({
  isConnectable,
  id,
}: {
  isConnectable: boolean;
  id: string;
}) => {
  return (
    <div className="audio-box__backend-container audio-box h-full flex items-center justify-center">
      <BackendBox type="audio" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default AudioNode;
