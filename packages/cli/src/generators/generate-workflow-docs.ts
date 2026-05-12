import path from "node:path";
import fs from "fs-extra";
import {
  renderBugFix,
  renderChangePlan,
  renderPrReviewChecklist,
  renderRefactor,
  renderRequirementAnalysis,
  renderTechnicalDesign,
} from "@create-ai-app/ai-rules";

export async function generateWorkflowDocs(workflowDir: string): Promise<void> {
  await fs.ensureDir(workflowDir);

  await Promise.all([
    fs.writeFile(path.join(workflowDir, "requirement-analysis.md"), renderRequirementAnalysis(), "utf8"),
    fs.writeFile(path.join(workflowDir, "technical-design.md"), renderTechnicalDesign(), "utf8"),
    fs.writeFile(path.join(workflowDir, "change-plan.md"), renderChangePlan(), "utf8"),
    fs.writeFile(path.join(workflowDir, "bug-fix.md"), renderBugFix(), "utf8"),
    fs.writeFile(path.join(workflowDir, "refactor.md"), renderRefactor(), "utf8"),
    fs.writeFile(path.join(workflowDir, "pr-review-checklist.md"), renderPrReviewChecklist(), "utf8"),
  ]);
}
