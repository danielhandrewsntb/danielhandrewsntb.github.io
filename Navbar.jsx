const { useState } = React;

const NAV_ITEMS = [
	{
		label: "Air to Air",
		path: "airtoair.html",
		image: "f16.JPG",
		heading: "Precision at Altitude",
		text: "Radar guided mult-platform combat ready solutions with both BVR and WVR options available.",
		names: [
			"AIM-174B", "AIM-9X Sidewinder", "AIM-120C-7 AMRAAM", "Meteor",
			"PL-10", "PL-15", "R-37M", "R-77", "Sky Sword II",
		],
	},
	{
		label: "Air to Surface",
		path: "airtosurface.html",
		image: "ats.png",
		heading: "Look out Below",
		text: "Targeting Pod enabled options for anti-infastructure and anti-shipping operations. Ready to mount on delivery. ",
		names: [
			"SPEAR 3", "YJ-83", "Kh-35", "Kh-38", "Kh-47M2 Kinzhal",
			"AGM-114 Hellfire", "AGM-88 HARM", "Harpoon", "AGM-65 Maverick",
		],
	},
	{
		label: "Surface to Air",
		path: "surfacetoair.html",
		image: "sm6.jpg",
		heading: "Counter Intrusion",
		text: "Portable and modular, built to enforce no-fly zones both temporarily, and permanantly",
		names: [
			"S-400 Triumf", "RIM-161 SM-3", "RIM-116 RAM", "S-300VM (Antey-2500)",
			"S-500 Prometey", "Rapier", "Sea Cat",
		],
	},
];

function Navbar() {
	const [activeIndex, setActiveIndex] = useState(null);

	return (
		<div className="nav-wrapper" onMouseLeave={() => setActiveIndex(null)}>
			<nav className="navbar">
				<a href="Ecorphome.html">
					<img src="Ecorp.png" alt="Ecorplogo" className="nav-logo" />
				</a>
				<ul className="nav-links">
					{NAV_ITEMS.map((item, index) => (
						<li key={item.label} onMouseEnter={() => setActiveIndex(index)}>
							<a href={item.path}>{item.label}</a>
						</li>
					))}
				</ul>
				<a href="procurement.html" className="nav-cart">
					<img src="eshop.png" alt="Cart icon" className="nav-cart-icon" />
					Procurement
				</a>
			</nav>

			<div className={`nav-panel ${activeIndex !== null ? "open" : ""}`}>
				{activeIndex !== null && (
					<div className="nav-panel-content">
						<div className="nav-panel-text">
							<h3>{NAV_ITEMS[activeIndex].heading}</h3>
							<p>{NAV_ITEMS[activeIndex].text}</p>
						</div>

						<div className="nav-panel-ticker">
							<div className="ticker-track">
								{[...NAV_ITEMS[activeIndex].names, ...NAV_ITEMS[activeIndex].names].map(
									(name, i) => (
										<div className="ticker-item" key={i}>
											{name}
										</div>
									)
								)}
							</div>
						</div>

						<img
							src={NAV_ITEMS[activeIndex].image}
							alt={NAV_ITEMS[activeIndex].heading}
							className="nav-panel-image"
						/>
					</div>
				)}
			</div>
		</div>
	);
}