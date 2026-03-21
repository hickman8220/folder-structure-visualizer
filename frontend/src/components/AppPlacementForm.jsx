function AppPlacementForm({ placementConfig, onPlacementChange }) {
  const isSpecific = placementConfig.mode === "specific";

  const handleModeChange = (mode) => {
    if (mode === "specific") {
      onPlacementChange({
        mode: "specific",
        targetFolder: placementConfig.targetFolder.trim() || "apps",
      });
      return;
    }

    onPlacementChange({
      mode: "root",
    });
  };

  const handleTargetFolderChange = (e) => {
    onPlacementChange({
      targetFolder: e.target.value,
    });
  };

  const handleParentPathChange = (e) => {
    onPlacementChange({
      parentPath: e.target.value,
    });
  };

  return (
    <div className="placement-card">
      <div className="placement-head">
        <h3>Generated app placement</h3>
        <p>
          Choose whether the generated frontend/backend folders should live at
          root or inside a custom folder path.
        </p>
      </div>

      <div className="placement-mode-row">
        <label className="placement-radio">
          <input
            type="radio"
            name="placement-mode"
            checked={placementConfig.mode === "root"}
            onChange={() => handleModeChange("root")}
          />
          <span>Root</span>
        </label>

        <label className="placement-radio">
          <input
            type="radio"
            name="placement-mode"
            checked={placementConfig.mode === "specific"}
            onChange={() => handleModeChange("specific")}
          />
          <span>Specific folder</span>
        </label>
      </div>

      {isSpecific ? (
        <div className="placement-fields">
          <label className="placement-field">
            <span>Target folder name</span>
            <input
              type="text"
              placeholder="apps"
              value={placementConfig.targetFolder}
              onChange={handleTargetFolderChange}
            />
          </label>

          <label className="placement-field">
            <span>Parent folder path (optional)</span>
            <input
              type="text"
              placeholder="platform/core"
              value={placementConfig.parentPath}
              onChange={handleParentPathChange}
            />
          </label>

          <div className="placement-note">
            If the folder path does not exist, it will be created automatically.
          </div>

          <div className="placement-preview">
            <span>Final placement path:</span>
            <code>
              {placementConfig.parentPath.trim()
                ? `${placementConfig.parentPath.trim()}/${
                    placementConfig.targetFolder.trim() || "apps"
                  }`
                : placementConfig.targetFolder.trim() || "apps"}
            </code>
          </div>
        </div>
      ) : (
        <div className="placement-note">
          Generated folders will be added directly at the project root.
        </div>
      )}
    </div>
  );
}

export default AppPlacementForm;
