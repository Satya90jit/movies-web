import React, { memo } from "react";

const TextTitles = memo(({ title }: { title: string }) => {
  return <h2 className="text-2xl mb-4 font-semibold text-white">{title}</h2>;
});

export default TextTitles;
