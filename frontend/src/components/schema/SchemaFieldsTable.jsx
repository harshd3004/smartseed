import TypeBadge from "../shared/TypeBadge";

function getConstraints(field) {
  const constraints = [];
  if (field.required === true) constraints.push("Required");
  if (field.unique === true) constraints.push("Unique");
  if (field.enum?.length) constraints.push(`Enum: ${field.enum.join(", ")}`);
  if (field.ref) constraints.push(`Ref: ${field.ref}`);
  if (field.min !== undefined) constraints.push(`Min: ${field.min}`);
  if (field.max !== undefined) constraints.push(`Max: ${field.max}`);
  if (field.default !== undefined) constraints.push(`Default: ${String(field.default)}`);
  return constraints;
}

export default function SchemaFieldsTable({ fields = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3 font-semibold">Field name</th>
            <th className="px-5 py-3 font-semibold">Data type</th>
            <th className="px-5 py-3 font-semibold">Constraints</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {fields.map((field) => {
            const constraints = getConstraints(field);
            return (
              <tr key={field.name} className="hover:bg-slate-50/70">
                <td className="px-5 py-3.5 font-mono text-[13px] font-medium text-slate-800">{field.name}</td>
                <td className="px-5 py-3.5"><TypeBadge type={field.type} /></td>
                <td className="px-5 py-3.5">
                  {constraints.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {constraints.map((item) => (
                        <span key={item} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{item}</span>
                      ))}
                    </div>
                  ) : <span className="text-slate-400">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
