const { useState } = React;

const ALL_PRODUCTS = [
	"AIM-174B", "AIM-9X Sidewinder", "AIM-120C-7 AMRAAM", "Meteor",
	"PL-10", "PL-15", "R-37M", "R-77", "Sky Sword II",
	"SPEAR 3", "YJ-83", "Kh-35", "Kh-38", "Kh-47M2 Kinzhal",
	"AGM-114 Hellfire", "AGM-88 HARM", "Harpoon", "AGM-65 Maverick",
	"S-400 Triumf", "RIM-161 SM-3", "RIM-116 RAM", "S-300VM (Antey-2500)",
	"S-500 Prometey", "Rapier", "Sea Cat",
];

function getProductFromURL() {
	const params = new URLSearchParams(window.location.search);
	return params.get("product") || "";
}

function Procurement() {
	const initialProduct = getProductFromURL();

	const [form, setForm] = useState({
		organization: "",
		headOfficeAddress: "",
		contactName: "",
		contactEmail: "",
	});

	const [items, setItems] = useState([
		{ product: initialProduct, units: 1 },
	]);

	const [showConfirm, setShowConfirm] = useState(false);

	const requiredFields = [
		"organization",
		"headOfficeAddress",
		"contactName",
		"contactEmail",
	];

	const fieldsFilled = requiredFields.every(
		(field) => form[field].trim() !== ""
	);

	const itemsValid = items.every(
		(item) => item.product.trim() !== "" && item.units >= 1
	);

	const isFormValid = fieldsFilled && itemsValid && items.length > 0;

	function handleChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleItemChange(index, field, value) {
		setItems((prev) =>
			prev.map((item, i) =>
				i === index ? { ...item, [field]: value } : item
			)
		);
	}

	function addItem() {
		setItems((prev) => [...prev, { product: "", units: 1 }]);
	}

	function removeItem(index) {
		setItems((prev) => prev.filter((_, i) => i !== index));
	}

	function handleSubmit(e) {
		e.preventDefault();
		setShowConfirm(true);
	}

	function confirmSubmit() {
		window.location.href = "RecordedResponse.html";
	}

	function cancelSubmit() {
		setShowConfirm(false);
	}

	return (
		<section className="procurement-page">
			<h1>Procurement Request</h1>

			<form className="procurement-form" onSubmit={handleSubmit}>
				<label>
					Organization *
					<input
						type="text"
						name="organization"
						value={form.organization}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Head Office Address *
					<input
						type="text"
						name="headOfficeAddress"
						value={form.headOfficeAddress}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Point of Contact Name *
					<input
						type="text"
						name="contactName"
						value={form.contactName}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Point of Contact Email *
					<input
						type="email"
						name="contactEmail"
						value={form.contactEmail}
						onChange={handleChange}
						required
					/>
				</label>

				<div className="procurement-items">
					<p className="procurement-items-label">Solutions Requested *</p>

					{items.map((item, index) => (
						<div className="procurement-item-row" key={index}>
							<select
								value={item.product}
								onChange={(e) =>
									handleItemChange(index, "product", e.target.value)
								}
							>
								<option value="">Select a product</option>
								{ALL_PRODUCTS.map((p) => (
									<option key={p} value={p}>
										{p}
									</option>
								))}
							</select>

							<input
								type="number"
								min="1"
								value={item.units}
								onChange={(e) =>
									handleItemChange(index, "units", Number(e.target.value))
								}
							/>

							{items.length > 1 && (
								<button
									type="button"
									className="remove-item-btn"
									onClick={() => removeItem(index)}
								>
									Remove
								</button>
							)}
						</div>
					))}

					<button type="button" className="add-item-btn" onClick={addItem}>
						+ Add Another Solution
					</button>
				</div>

				<button
					type="submit"
					className="procurement-submit"
					disabled={!isFormValid}
				>
					Submit Request
				</button>
			</form>

			{showConfirm && (
				<div className="confirm-overlay">
					<div className="confirm-modal">
						<h2>Confirm Procurement Request</h2>
						<p className="confirm-detail">
							<strong>Organization:</strong> {form.organization}
						</p>
						<p className="confirm-detail">
							<strong>Point of Contact:</strong> {form.contactName} ({form.contactEmail})
						</p>
						<div className="confirm-items-list">
							{items.map((item, i) => (
								<p className="confirm-detail" key={i}>
									{item.units}x {item.product}
								</p>
							))}
						</div>
						<p className="confirm-warning">
							Please double check this information before proceeding.
						</p>
						<div className="confirm-buttons">
							<button className="confirm-back-btn" onClick={cancelSubmit}>
								Go Back
							</button>
							<button className="confirm-proceed-btn" onClick={confirmSubmit}>
								Proceed
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}