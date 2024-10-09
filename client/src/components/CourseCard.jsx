"use client";
import React from "react";

import { HoverEffect } from "./ui/CardHoverEffect";

export function CardHoverEffectDemo({ courses }) {
  return (
    <div className="mx-auto px-8">
      <HoverEffect items={courses} />
    </div>
  );
}
