'use client';

import React from 'react';
import { X, Award, ExternalLink, Briefcase, Sparkles, Building2 } from 'lucide-react';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  tag: string;
  image: string;
  bio: string;
  keynoteTopic: string;
  previousExits: string;
  syndicateSize: string;
}

interface SpeakerDossierModalProps {
  speaker: Speaker | null;
  onClose: () => void;
}

export const SpeakerDossierModal: React.FC<SpeakerDossierModalProps> = ({ speaker, onClose }) => {
  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.85)] backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bezel-shell rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bezel-core p-8 md:p-10 bg-gradient-to-b from-[rgb(64,43,40)] to-[rgb(27,8,5)] relative max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] text-[rgb(234,224,211)] hover:bg-[rgb(64,43,40)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header section with photo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[rgb(234,224,211)] shrink-0 shadow-lg">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[rgba(255,255,255,0.1)] font-mono text-[10px] uppercase tracking-wider text-[rgb(74,222,128)] mb-2">
                <Sparkles className="w-3 h-3" />
                {speaker.tag}
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-display text-[rgb(248,244,237)]">
                {speaker.name}
              </h3>
              <p className="font-mono text-xs text-[rgb(212,193,177)]">
                {speaker.role} • <span className="text-[rgb(234,224,211)] font-semibold">{speaker.organization}</span>
              </p>
            </div>
          </div>

          {/* Keynote focus highlight box */}
          <div className="p-5 rounded-2xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] mb-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[rgb(250,204,21)] mb-2">
              <Award className="w-4 h-4" />
              CONFIRMED KEYNOTE & CLOSED-DOOR SESSION
            </div>
            <p className="text-base font-bold text-[rgb(248,244,237)] font-display">
              "{speaker.keynoteTopic}"
            </p>
          </div>

          {/* Bio text */}
          <div className="mb-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[rgb(165,138,122)] mb-2">
              EXECUTIVE DOSSIER & TRACK RECORD
            </h4>
            <p className="text-sm text-[rgba(248,244,237,0.85)] leading-relaxed">
              {speaker.bio}
            </p>
          </div>

          {/* Statistics grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)]">
              <div className="font-mono text-[10px] text-[rgb(165,138,122)] uppercase">
                Prior Track Record / Exits
              </div>
              <div className="font-display font-bold text-base text-[rgb(248,244,237)] mt-1">
                {speaker.previousExits}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)]">
              <div className="font-mono text-[10px] text-[rgb(165,138,122)] uppercase">
                Syndicate Allocation Power
              </div>
              <div className="font-display font-bold text-base text-[rgb(74,222,128)] mt-1">
                {speaker.syndicateSize}
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[rgb(234,224,211)] text-[rgb(27,8,5)] font-display font-bold text-sm tracking-wider uppercase hover:bg-[rgb(248,244,237)] transition-all cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
