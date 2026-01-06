import React from "react";

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

//
const AcceptCGVSection = ({ checked, onChange }: Props) => (
    <section>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                required
            />
            J’accepte les{" "}
            <a href="/cgv" target="_blank" style={{ textDecoration: "underline" }}>
                Conditions Générales de Vente (CGV)
            </a>
            <span style={{ color: "red" }}>*</span>
        </label>
    </section>
);

export default AcceptCGVSection;