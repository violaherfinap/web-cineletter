"use client";

import React from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Edit Page for Movie ID: {params.id}</h1>
    </div>
  );
}