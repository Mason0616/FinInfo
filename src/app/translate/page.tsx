import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { TranslationStudio } from '@/components/public/translation-studio';

export default function TranslatePage() {
  return <WorkbenchShell><main className="main-area public-page public-page-wide"><p className="eyebrow">TRANSLATE / PUBLIC REPORTS</p><h1>内容转译</h1><p className="public-lede">从一份公开报告出发，生成适合不同传播场景的表达草稿，并始终保留来源入口。</p><TranslationStudio /></main></WorkbenchShell>;
}
