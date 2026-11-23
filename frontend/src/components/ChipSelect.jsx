export default function ChipSelect({ options, value, onChange, multiple = false }) {
    const isSelected = (o) => (multiple ? value.includes(o) : value === o);

    const toggle = (o) => {
        if (multiple) {
            onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
        } else {
            onChange(value === o ? "" : o);
        }
    };

    return (
        <div className="chips">
            {options.map((o) => (
                <button
                    key={o}
                    type="button"
                    className={`chip ${isSelected(o) ? "selected" : ""}`}
                    aria-pressed={isSelected(o)}
                    onClick={() => toggle(o)}
                >
                    {o}
                </button>
            ))}
        </div>
    );
}