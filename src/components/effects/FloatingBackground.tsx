import "./FloatingBackground.css";
export default function FloatingBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <span className="ambient-blob blob-one" />
      <span className="ambient-blob blob-two" />
      <span className="ambient-blob blob-three" />
      <span className="ambient-grain" />
      <svg className="ambient-vine vine-left" viewBox="0 0 150 360" fill="none">
        <path
          d="M20 350C65 270 5 210 67 143S95 48 50 10"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M35 294C5 278 3 252 9 235C30 240 45 262 35 294ZM55 202C82 188 90 165 82 148C60 158 48 179 55 202ZM69 119C43 102 42 80 51 64C71 77 80 99 69 119Z"
          fill="currentColor"
          fillOpacity=".35"
        />
      </svg>
      <svg
        className="ambient-vine vine-right"
        viewBox="0 0 150 360"
        fill="none"
      >
        <path
          d="M130 350C85 270 145 210 83 143S55 48 100 10"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M115 294C145 278 147 252 141 235C120 240 105 262 115 294ZM95 202C68 188 60 165 68 148C90 158 102 179 95 202Z"
          fill="currentColor"
          fillOpacity=".35"
        />
      </svg>
    </div>
  );
}
