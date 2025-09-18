WA.onInit().then(() => {
  console.log("✅ WorkAdventure script started");

  // --- Set role from URL (?role=admin) ---
  const urlParams = new URLSearchParams(window.location.search);
  WA.player.state.role = urlParams.get("role") || "guest";
  console.log("Player role set to:", WA.player.state.role);

  // --- Example: block guests from a zone called "restrictedZone" ---
  WA.room.onEnterZone("restrictedZone", () => {
    if (WA.player.state.role !== "admin") {
      // Move them back to spawn
      WA.player.teleport(2, 2); // Change (2,2) to your map's safe spawn coords

      // Show a popup message
      WA.ui.openPopup("noEntry", "🚫 This area is for admins only!", [
        {
          label: "OK",
          className: "primary",
          callback: (popup) => popup.close(),
        },
      ]);
    } else {
      console.log("✅ Access granted to restricted zone");
    }
  });
});
