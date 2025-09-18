WA.onInit().then(() => {
  console.log("✅ WorkAdventure script started");

  // --- Set role from URL (?role=admin) ---
  const urlParams = new URLSearchParams(window.location.search);
  WA.player.state.role = urlParams.get("role") || "guest";

  // --- Example: block guests from a zone called "restrictedZone" ---
  WA.room.onEnterZone("restrictedZone", () => {
    if (WA.player.state.role !== "admin") {
      WA.player.teleport(2, 2); // safe coords
      WA.ui.openPopup("noEntry", "🚫 This area is for admins only!", [
        { label: "OK", className: "primary", callback: (popup) => popup.close() }
      ]);
    }
  });
});
