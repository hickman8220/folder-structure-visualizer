import AppPlacementForm from "./AppPlacementForm";

function ScaffoldOptions({
  options,
  onToggle,
  placementConfig,
  onPlacementChange,
}) {
  const showPlacementForm = options.reactVite || options.expressBackend;

  return (
    <div className="scaffold-options-card">
      <div className="section-head">
        <div>
          <h2>Scaffold Presets</h2>
          <p>Merge ready-made starter files into the parsed structure</p>
        </div>
      </div>

      <div className="scaffold-options-list">
        <label className="scaffold-option">
          <input
            type="checkbox"
            checked={options.reactVite}
            onChange={() => onToggle("reactVite")}
          />
          <span>Generate React + Vite app</span>
        </label>

        <label className="scaffold-option">
          <input
            type="checkbox"
            checked={options.typescript}
            disabled={!options.reactVite}
            onChange={() => onToggle("typescript")}
          />
          <span>Use TypeScript (TSX)</span>
        </label>

        <label className="scaffold-option">
          <input
            type="checkbox"
            checked={options.expressBackend}
            onChange={() => onToggle("expressBackend")}
          />
          <span>Generate Node + Express API</span>
        </label>

        <label className="scaffold-option">
          <input
            type="checkbox"
            checked={options.tailwind}
            disabled={!options.reactVite}
            onChange={() => onToggle("tailwind")}
          />
          <span>Add Tailwind CSS config</span>
        </label>

        <label className="scaffold-option">
          <input
            type="checkbox"
            checked={options.gitignore}
            onChange={() => onToggle("gitignore")}
          />
          <span>Add root .gitignore</span>
        </label>
      </div>

      {showPlacementForm ? (
        <AppPlacementForm
          placementConfig={placementConfig}
          onPlacementChange={onPlacementChange}
        />
      ) : null}
    </div>
  );
}

export default ScaffoldOptions;
