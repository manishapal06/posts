// (1) React, memo for React.memo, and useMemo for stable random color
import React, { memo, useMemo } from "react";

// (2) A small helper to produce a pretty random color (HSL)
const randomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

function Post({ id, title, body, verifyPost, onToggleVerify }) {
  // (3) Assign a random background ONCE per component lifetime
  //     Empty dependency array => computed only on first mount
  const bg = useMemo(() => randomColor(), []);

  // (4) OPTIONAL: Uncomment to see when this component re-renders
  // console.log("Render:", id);

  return (
    <div className="post" style={{ background: bg }}>
      <div className="post-header">
        <div className="post-title">{title}</div>
        <button className="btn small" onClick={() => onToggleVerify(id)}>
          {verifyPost ? "Verified" : "Verify"}
        </button>
      </div>
      <div className="post-body">{body}</div>
    </div>
  );
}

// (5) Wrap with React.memo so this Post WON'T re-render unless its props change.
//     With stable props + useCallback in parent, timer ticks won't re-render posts.
export default memo(Post);
