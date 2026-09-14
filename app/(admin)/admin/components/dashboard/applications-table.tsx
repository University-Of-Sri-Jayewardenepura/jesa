"use client";

import {
	CheckSquare,
	ChevronLeft,
	ChevronRight,
	Eye,
	Loader2,
	Square,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getAwardLabel } from "@/lib/awards";
import type { Application, ApplicationStatus } from "./types";

interface ApplicationsTableProps {
	applications: Application[];
	loading: boolean;
	selectedIds: string[];
	onSelect: (id: string) => void;
	onSelectAll: (ids: string[]) => void;
	onView: (app: Application) => void;
	onDelete: (app: Application) => void;
	onStatusChange?: (id: string, status: ApplicationStatus) => void;
}

const PAGE_SIZE = 25;

export default function ApplicationsTable({
	applications,
	loading,
	selectedIds,
	onSelect,
	onSelectAll,
	onView,
	onDelete,
	onStatusChange,
}: ApplicationsTableProps) {
	const [page, setPage] = useState(1);

	const totalPages = Math.max(1, Math.ceil(applications.length / PAGE_SIZE));
	const start = (page - 1) * PAGE_SIZE;
	const paginated = applications.slice(start, start + PAGE_SIZE);

	const allCurrentSelected =
		paginated.length > 0 &&
		paginated.every((app) => selectedIds.includes(app.id));

	const handleSelectAll = () => {
		if (allCurrentSelected) {
			onSelectAll(paginated.map((app) => app.id));
		} else {
			onSelectAll([
				...selectedIds,
				...paginated
					.map((app) => app.id)
					.filter((id) => !selectedIds.includes(id)),
			]);
		}
	};

	if (loading) {
		return (
			<div className="rounded-2xl border border-slate-700/50 p-12 text-center text-slate-500">
				<Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
				Loading applications...
			</div>
		);
	}

	if (applications.length === 0) {
		return (
			<div className="rounded-2xl border border-slate-700/50 p-12 text-center text-slate-500">
				No applications found matching your filters.
			</div>
		);
	}

	return (
		<div>
			<div className="overflow-x-auto rounded-2xl border border-slate-700/50">
				<table className="w-full text-left text-sm">
					<thead className="bg-slate-800/80 text-slate-300">
						<tr>
							<th className="px-4 py-3 w-10">
								<button
									onClick={handleSelectAll}
									className="text-slate-400 hover:text-slate-100"
								>
									{allCurrentSelected ? (
										<CheckSquare className="w-4 h-4" />
									) : (
										<Square className="w-4 h-4" />
									)}
								</button>
							</th>
							<th className="px-4 py-3 font-medium">Applicant</th>
							<th className="px-4 py-3 font-medium">Type</th>
							<th className="px-4 py-3 font-medium">University</th>
							<th className="px-4 py-3 font-medium">Faculty</th>
							<th className="px-4 py-3 font-medium">Awards</th>
							<th className="px-4 py-3 font-medium">Status</th>
							<th className="px-4 py-3 font-medium">Submitted</th>
							<th className="px-4 py-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-700/50">
						{paginated.map((app) => (
							<tr
								key={app.id}
								className={`hover:bg-slate-800/40 transition-colors ${
									selectedIds.includes(app.id) ? "bg-slate-800/60" : ""
								}`}
							>
								<td className="px-4 py-3">
									<button
										onClick={() => onSelect(app.id)}
										className="text-slate-400 hover:text-slate-100"
									>
										{selectedIds.includes(app.id) ? (
											<CheckSquare className="w-4 h-4" />
										) : (
											<Square className="w-4 h-4" />
										)}
									</button>
								</td>
								<td className="px-4 py-3 text-slate-200">
									{app.personalInfo?.publicDisplayName || "—"}
									<div className="text-xs text-slate-500">
										{app.personalInfo?.email}
									</div>
								</td>
								<td className="px-4 py-3">
									<span className="capitalize text-slate-300">
										{app.applicantType || "—"}
									</span>
								</td>
								<td className="px-4 py-3 text-slate-300">
									{app.academicInfo?.university || "—"}
								</td>
								<td className="px-4 py-3 text-slate-300">
									{app.academicInfo?.faculty || "—"}
								</td>
								<td className="px-4 py-3">
									<div className="flex flex-wrap gap-1 max-w-xs">
										{app.awardSelection?.selectedAwards?.map((award) => (
											<span
												key={award}
												className="inline-flex items-center rounded-full bg-blue-600/15 px-2 py-0.5 text-xs text-blue-300 border border-blue-600/20"
											>
												{getAwardLabel(award)}
											</span>
										)) || "—"}
									</div>
								</td>
								<td className="px-4 py-3">
									<StatusBadge status={app.status || "submitted"} />
								</td>
								<td className="px-4 py-3 text-slate-400 whitespace-nowrap">
									{app.submittedAt
										? new Date(app.submittedAt).toLocaleDateString()
										: "—"}
								</td>
								<td className="px-4 py-3 text-right">
									<div className="flex items-center justify-end gap-2">
										{onStatusChange && (
											<Select
												value={app.status || "submitted"}
												onValueChange={(val) =>
													onStatusChange(app.id, val as ApplicationStatus)
												}
											>
												<SelectTrigger className="h-8 min-w-[110px] border border-slate-600 bg-slate-800/50 text-xs text-slate-300 hover:bg-slate-800">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="submitted">Submitted</SelectItem>
													<SelectItem value="shortlisted">
														Shortlisted
													</SelectItem>
													<SelectItem value="approved">Approved</SelectItem>
													<SelectItem value="rejected">Rejected</SelectItem>
												</SelectContent>
											</Select>
										)}
										<Button
											size="sm"
											variant="ghost"
											onClick={() => onView(app)}
											className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100"
										>
											<Eye className="w-4 h-4" />
										</Button>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => onDelete(app)}
											className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-between mt-4">
				<p className="text-slate-400 text-sm">
					Showing {start + 1}-{Math.min(start + PAGE_SIZE, applications.length)}{" "}
					of {applications.length} applications
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
						className="rounded-[8px] border-slate-600 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
					>
						<ChevronLeft className="w-4 h-4" />
					</Button>
					<span className="text-slate-400 text-sm">
						Page {page} of {totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={page === totalPages}
						className="rounded-[8px] border-slate-600 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
					>
						<ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function StatusBadge({ status }: { status: string }) {
	const styles: Record<string, string> = {
		submitted: "bg-slate-600/15 text-slate-300 border-slate-600/20",
		shortlisted: "bg-blue-600/15 text-blue-300 border-blue-600/20",
		approved: "bg-emerald-600/15 text-emerald-300 border-emerald-600/20",
		rejected: "bg-red-600/15 text-red-300 border-red-600/20",
	};

	return (
		<span
			className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs border capitalize ${
				styles[status] || styles.submitted
			}`}
		>
			{status}
		</span>
	);
}
