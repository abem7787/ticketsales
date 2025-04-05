// src/components/ui/card.js
import React from "react";

export function Card({ className, children }) {
  return <div className={`rounded-xl shadow-md ${className}`}>{children}</div>;
}

export function CardContent({ className, children }) {
  return <div className={className}>{children}</div>;
}
