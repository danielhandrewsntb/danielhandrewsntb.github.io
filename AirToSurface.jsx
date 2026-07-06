const { useState } = React;

const MISSILES = [
	{
		id: 1,
		name: "SPEAR 3",
		image: "spear3.jpg",
		company: "MBDA",
		unitCost: null,
		range: "140+ km",
		speed: "High subsonic",
		guidance: "GPS/INS, mmWave radar, semi-active laser",
	},
	{
		id: 2,
		name: "YJ-83",
		image: "yj83.jpg",
		company: "China Aerospace (CASIC)",
		unitCost: null,
		range: "180 km",
		speed: "High subsonic",
		guidance: "Active radar homing",
	},
	{
		id: 3,
		name: "Kh-35",
		image: "kh-35.jpg",
		company: "Zvezda-Strela",
		unitCost: 500000,
		range: "130-260 km",
		speed: "High subsonic",
		guidance: "Active radar homing",
	},
	{
		id: 4,
		name: "Kh-38",
		image: "kh-38.jpg",
		company: "Tactical Missiles Corporation",
		unitCost: null,
		range: "40 km",
		speed: "Supersonic",
		guidance: "Laser/TV/GPS/active radar variants",
	},
	{
		id: 5,
		name: "Kh-47M2 Kinzhal",
		image: "kh47.jpeg",
		company: "Tactical Missiles Corporation",
		unitCost: null,
		range: "2,000 km",
		speed: "Mach 10",
		guidance: "Inertial with GLONASS/GPS updates",
	},
	{
		id: 6,
		name: "AGM-114 Hellfire",
		image: "agm114jpg.jpg",
		company: "Lockheed Martin",
		unitCost: 150000,
		range: "8 km",
		speed: "High subsonic",
		guidance: "Semi-active laser / radar / imaging infrared",
	},
	{
		id: 7,
		name: "AGM-88 HARM",
		image: "agm88.jpg",
		company: "Raytheon",
		unitCost: 870000,
		range: "150 km",
		speed: "Mach 2",
		guidance: "Passive radar homing (anti-radiation)",
	},
	{
		id: 8,
		name: "Harpoon",
		image: "harpoon.jpg",
		company: "Boeing",
		unitCost: 1400000,
		range: "125+ km",
		speed: "High subsonic",
		guidance: "Active radar homing, sea-skimming",
	},
	{
		id: 9,
		name: "AGM-65 Maverick",
		image: "mav.jpeg",
		company: "Raytheon",
		unitCost: 300000,
		range: "27 km",
		speed: "High subsonic",
		guidance: "Imaging infrared / TV / laser variants",
	},
];

function formatCost(cost) {
	if (cost === null) return "Not Disclosed";
	return `$${cost.toLocaleString()}`;
}

function MissileCard({ missile }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			className="missile-card"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="missile-card-top">
				<img src={missile.image} alt={missile.name} className="missile-image" />
				<h3>{missile.name}</h3>
				<p className="missile-cost">{formatCost(missile.unitCost)}</p>
				<span className={`expand-icon ${hovered ? "open" : ""}`}>+</span>
			</div>

			<div className={`missile-details ${hovered ? "open" : ""}`}>
				<div className="missile-detail-row">
					<span className="detail-label">Company</span>
					<span className="detail-value">{missile.company}</span>
				</div>
				<div className="missile-detail-row">
					<span className="detail-label">Range</span>
					<span className="detail-value">{missile.range}</span>
				</div>
				<div className="missile-detail-row">
					<span className="detail-label">Speed</span>
					<span className="detail-value">{missile.speed}</span>
				</div>
				<div className="missile-detail-row">
					<span className="detail-label">Guidance</span>
					<span className="detail-value">{missile.guidance}</span>
				</div>

				<button
				className="contact-sales-btn"
				onClick={() => {
					window.location.href = `procurement.html?product=${encodeURIComponent(missile.name)}`;
				}}
			>
				Contact Sales
			</button>
			</div>
		</div>
	);
}
function parseRange(rangeStr) {
	const match = rangeStr.match(/[\d.]+/);
	return match ? parseFloat(match[0]) : 0;
}

function parseSpeed(speedStr) {
	const match = speedStr.match(/[\d.]+/);
	return match ? parseFloat(match[0]) : 0;
}

function AirToSurface() {
	const [sortBy, setSortBy] = useState("name");
	const [companyFilter, setCompanyFilter] = useState("all");

	const companies = ["all", ...new Set(MISSILES.map((m) => m.company))];

	let filtered =
		companyFilter === "all"
			? MISSILES
			: MISSILES.filter((m) => m.company === companyFilter);

	let sorted = [...filtered].sort((a, b) => {
	if (sortBy === "name") return a.name.localeCompare(b.name);
	if (sortBy === "cost") {
		if (a.unitCost === null) return 1;
		if (b.unitCost === null) return -1;
		return a.unitCost - b.unitCost;
	}
	if (sortBy === "speed") return parseSpeed(b.speed) - parseSpeed(a.speed);
	if (sortBy === "range") return parseRange(b.range) - parseRange(a.range);
	return 0;
});

	return (
		<section className="air-to-air-page">
			<h1>Air to Surface</h1>

			<div className="controls">
				<div className="control-group">
					<label>Sort by</label>
					<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
						<option value="name">Name</option>
						<option value="cost">Unit Cost</option>
						<option value="speed">Speed</option>
						<option value="range">Range</option>
					</select>
				</div>

				<div className="control-group">
					<label>Company</label>
					<select
						value={companyFilter}
						onChange={(e) => setCompanyFilter(e.target.value)}
					>
						{companies.map((c) => (
							<option key={c} value={c}>
								{c === "all" ? "All Companies" : c}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="missile-grid">
				{sorted.map((missile) => (
					<MissileCard key={missile.id} missile={missile} />
				))}
			</div>
		</section>
	);
}