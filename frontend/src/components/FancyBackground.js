import React from "react";

export default function FancyBackground(){
  return (
    <div style={{
      position:"fixed", left:0, top:0, width:"100%", height:"100%", zIndex:-1,
      background: "radial-gradient(circle at 10% 10%, rgba(99,102,241,0.12), transparent 10%), radial-gradient(circle at 90% 80%, rgba(16,185,129,0.06), transparent 10%)"
    }} />
  );
}
