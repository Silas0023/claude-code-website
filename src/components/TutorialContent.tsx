'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Download,
  Settings,
  Code,
  AlertCircle,
  Terminal
} from 'lucide-react';

interface TutorialProps {
  handleCopyCode: (code: string) => void;
  copiedCode: string | null;
  apiKey?: string;
}

const CodeBlock = ({ code, handleCopyCode, copiedCode }: { code: string; handleCopyCode: (code: string) => void; copiedCode: string | null }) => (
  <div className="relative bg-gray-900 rounded-lg p-4 my-4">
    <pre className="text-gray-300 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
    <button
      onClick={() => handleCopyCode(code)}
      className="absolute top-3 right-3 p-2 hover:bg-gray-800 rounded-lg transition-colors"
    >
      {copiedCode === code ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  </div>
);

const StepCard = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-lg p-6 mb-6"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const InfoBox = ({ type, children }: { type: 'tip' | 'warning'; children: React.ReactNode }) => (
  <div className={`rounded-lg p-4 my-4 ${
    type === 'tip' ? 'bg-blue-50 border border-blue-200' : 'bg-yellow-50 border border-yellow-200'
  }`}>
    <div className="flex gap-3">
      {type === 'tip' ? (
        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      )}
      <div className={`text-sm ${type === 'tip' ? 'text-blue-700' : 'text-yellow-700'}`}>
        {children}
      </div>
    </div>
  </div>
);

export function WindowsTutorial({ handleCopyCode, copiedCode, apiKey }: TutorialProps) {
  const actualApiKey = apiKey || "你的API密钥";
  const baseUrl = "https://claude.nnppn.cn/api";

  return (
    <div>
      <StepCard number="1" title="安装 Node.js 环境">
        <p className="text-gray-600 mb-4">Claude Code 需要 Node.js 环境才能运行。</p>

        <h3 className="font-semibold text-gray-900 mb-2">Windows 安装方法</h3>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">方法一：官网下载（推荐）</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>打开浏览器访问 <a href="https://nodejs.org/" target="_blank" className="text-blue-600 hover:underline">https://nodejs.org/</a></li>
            <li>点击 "LTS" 版本进行下载（推荐长期支持版本）</li>
            <li>下载完成后双击 .msi 文件</li>
            <li>按照安装向导完成安装，保持默认设置即可</li>
          </ol>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">方法二：使用包管理器</h4>
          <p className="text-gray-600 mb-2">如果你安装了 Chocolatey 或 Scoop，可以使用命令行安装：</p>
          <CodeBlock
            code={`# 使用 Chocolatey
choco install nodejs

# 或使用 Scoop
scoop install nodejs`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
        </div>

        <InfoBox type="warning">
          <ul className="space-y-1">
            <li>• 建议使用 PowerShell 而不是 CMD</li>
            <li>• 如果遇到权限问题，尝试以管理员身份运行</li>
            <li>• 某些杀毒软件可能会误报，需要添加白名单</li>
          </ul>
        </InfoBox>

        <h4 className="font-medium text-gray-800 mb-2">验证安装是否成功</h4>
        <p className="text-gray-600 mb-2">安装完成后，打开 PowerShell 或 CMD，输入以下命令：</p>
        <CodeBlock
          code={`node --version
npm --version`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
        <p className="text-gray-600">如果显示版本号，说明安装成功了！</p>
      </StepCard>

      <StepCard number="2" title="安装 Claude Code">
        <p className="text-gray-600 mb-4">打开 PowerShell 或 CMD，运行以下命令：</p>

        <CodeBlock
          code={`# 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-600 mb-2">这个命令会从 npm 官方仓库下载并安装最新版本的 Claude Code。</p>

        <InfoBox type="tip">
          <ul className="space-y-1">
            <li>• 建议使用 PowerShell 而不是 CMD，功能更强大</li>
            <li>• 如果遇到权限问题，以管理员身份运行 PowerShell</li>
          </ul>
        </InfoBox>

        <h4 className="font-medium text-gray-800 mb-2">验证 Claude Code 安装</h4>
        <p className="text-gray-600 mb-2">安装完成后，输入以下命令检查是否安装成功：</p>
        <CodeBlock
          code={`claude --version`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
        <p className="text-gray-600">如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p>
      </StepCard>

      <StepCard number="3" title="设置环境变量">
        <p className="text-gray-600 mb-4">为了让 Claude Code 连接到你的中转服务，需要设置两个环境变量：</p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">方法一：PowerShell 临时设置（当前会话）</h4>
          <p className="text-gray-600 mb-2">在 PowerShell 中运行以下命令：</p>
          <CodeBlock
            code={`$env:ANTHROPIC_BASE_URL = "${baseUrl}"
$env:ANTHROPIC_AUTH_TOKEN = "${actualApiKey}"`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
          {!apiKey && (
            <InfoBox type="tip">
              <p>💡 记得将 "{actualApiKey}" 替换为在上方显示的实际API密钥。</p>
            </InfoBox>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">方法二：PowerShell 永久设置（用户级）</h4>
          <p className="text-gray-600 mb-2">在 PowerShell 中运行以下命令设置用户级环境变量：</p>
          <CodeBlock
            code={`# 设置用户级环境变量（永久生效）
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "${baseUrl}", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "${actualApiKey}", [System.EnvironmentVariableTarget]::User)`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />

          <p className="text-gray-600 mb-2 mt-4">查看已设置的环境变量：</p>
          <CodeBlock
            code={`# 查看用户级环境变量
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_BASE_URL", [System.EnvironmentVariableTarget]::User)
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", [System.EnvironmentVariableTarget]::User)`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />

          <InfoBox type="tip">
            <p>💡 设置后需要重新打开 PowerShell 窗口才能生效。</p>
          </InfoBox>
        </div>

        <h4 className="font-medium text-gray-800 mb-2">验证环境变量设置</h4>
        <p className="text-gray-600 mb-2">设置完环境变量后，可以通过以下命令验证是否设置成功：</p>

        <p className="text-gray-700 font-medium mt-4 mb-2">在 PowerShell 中验证：</p>
        <CodeBlock
          code={`echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-700 font-medium mt-4 mb-2">在 CMD 中验证：</p>
        <CodeBlock
          code={`echo %ANTHROPIC_BASE_URL%
echo %ANTHROPIC_AUTH_TOKEN%`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-600 mb-2">预期输出示例：</p>
        <CodeBlock
          code={`${baseUrl}
cr_xxxxxxxxxxxxxxxxxx`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <InfoBox type="tip">
          <p>💡 如果输出为空或显示变量名本身，说明环境变量设置失败，请重新设置。</p>
        </InfoBox>
      </StepCard>
    </div>
  );
}

export function MacOSTutorial({ handleCopyCode, copiedCode, apiKey }: TutorialProps) {
  const actualApiKey = apiKey || "你的API密钥";
  const baseUrl = "https://claude.nnppn.cn/api";

  return (
    <div>
      <StepCard number="1" title="安装 Node.js 环境">
        <p className="text-gray-600 mb-4">Claude Code 需要 Node.js 环境才能运行。</p>

        <h3 className="font-semibold text-gray-900 mb-2">macOS 安装方法</h3>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">方法一：使用 Homebrew（推荐）</h4>
          <p className="text-gray-600 mb-2">如果你已经安装了 Homebrew，使用它安装 Node.js 会更方便：</p>
          <CodeBlock
            code={`# 更新 Homebrew
brew update

# 安装 Node.js
brew install node`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">方法二：官网下载</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>访问 <a href="https://nodejs.org/" target="_blank" className="text-blue-600 hover:underline">https://nodejs.org/</a></li>
            <li>下载适合 macOS 的 LTS 版本</li>
            <li>打开下载的 .pkg 文件</li>
            <li>按照安装程序指引完成安装</li>
          </ol>
        </div>

        <InfoBox type="warning">
          <ul className="space-y-1">
            <li>• 如果遇到权限问题，可能需要使用 sudo</li>
            <li>• 首次运行可能需要在系统偏好设置中允许</li>
            <li>• 建议使用 Terminal 或 iTerm2</li>
          </ul>
        </InfoBox>

        <h4 className="font-medium text-gray-800 mb-2">验证安装是否成功</h4>
        <p className="text-gray-600 mb-2">安装完成后，打开 Terminal，输入以下命令：</p>
        <CodeBlock
          code={`node --version
npm --version`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
        <p className="text-gray-600">如果显示版本号，说明安装成功了！</p>
      </StepCard>

      <StepCard number="2" title="安装 Claude Code">
        <p className="text-gray-600 mb-4">打开 Terminal，运行以下命令：</p>

        <CodeBlock
          code={`# 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-600 mb-2">如果遇到权限问题，可以使用 sudo：</p>
        <CodeBlock
          code={`sudo npm install -g @anthropic-ai/claude-code`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <h4 className="font-medium text-gray-800 mb-2 mt-4">验证 Claude Code 安装</h4>
        <p className="text-gray-600 mb-2">安装完成后，输入以下命令检查是否安装成功：</p>
        <CodeBlock
          code={`claude --version`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
        <p className="text-gray-600">如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p>
      </StepCard>

      <StepCard number="3" title="设置环境变量">
        <p className="text-gray-600 mb-4">为了让 Claude Code 连接到你的中转服务，需要设置两个环境变量：</p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">方法一：临时设置（当前会话）</h4>
          <p className="text-gray-600 mb-2">在 Terminal 中运行以下命令：</p>
          <CodeBlock
            code={`export ANTHROPIC_BASE_URL="${baseUrl}"
export ANTHROPIC_AUTH_TOKEN="${actualApiKey}"`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
          {!apiKey && (
            <InfoBox type="tip">
              <p>💡 记得将 "{actualApiKey}" 替换为在上方显示的实际API密钥。</p>
            </InfoBox>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">方法二：永久设置</h4>
          <p className="text-gray-600 mb-2">编辑你的 shell 配置文件（根据你使用的 shell）：</p>

          <p className="text-gray-700 font-medium mt-4 mb-2">对于 zsh (默认)：</p>
          <CodeBlock
            code={`echo 'export ANTHROPIC_BASE_URL="${baseUrl}"' >> ~/.zshrc
echo 'export ANTHROPIC_AUTH_TOKEN="${actualApiKey}"' >> ~/.zshrc
source ~/.zshrc`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />

          <p className="text-gray-700 font-medium mt-4 mb-2">对于 bash：</p>
          <CodeBlock
            code={`echo 'export ANTHROPIC_BASE_URL="${baseUrl}"' >> ~/.bash_profile
echo 'export ANTHROPIC_AUTH_TOKEN="${actualApiKey}"' >> ~/.bash_profile
source ~/.bash_profile`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
        </div>

        <h4 className="font-medium text-gray-800 mb-2">验证环境变量设置</h4>
        <p className="text-gray-600 mb-2">设置完环境变量后，可以通过以下命令验证是否设置成功：</p>
        <CodeBlock
          code={`echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-600 mb-2">预期输出示例：</p>
        <CodeBlock
          code={`${baseUrl}
cr_xxxxxxxxxxxxxxxxxx`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
      </StepCard>
    </div>
  );
}

export function LinuxTutorial({ handleCopyCode, copiedCode, apiKey }: TutorialProps) {
  const actualApiKey = apiKey || "你的API密钥";
  const baseUrl = "https://claude.nnppn.cn/api";

  return (
    <div>
      <StepCard number="1" title="安装 Node.js 环境">
        <p className="text-gray-600 mb-4">Claude Code 需要 Node.js 环境才能运行。</p>

        <h3 className="font-semibold text-gray-900 mb-2">Linux 安装方法</h3>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">方法一：使用官方仓库（推荐）</h4>
          <CodeBlock
            code={`# 添加 NodeSource 仓库
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# 安装 Node.js
sudo apt-get install -y nodejs`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">方法二：使用系统包管理器</h4>
          <p className="text-gray-600 mb-2">虽然版本可能不是最新的，但对于基本使用已经足够：</p>

          <p className="text-gray-700 font-medium mt-4 mb-2">Ubuntu/Debian：</p>
          <CodeBlock
            code={`sudo apt update
sudo apt install nodejs npm`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />

          <p className="text-gray-700 font-medium mt-4 mb-2">CentOS/RHEL/Fedora：</p>
          <CodeBlock
            code={`sudo dnf install nodejs npm`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
        </div>

        <InfoBox type="warning">
          <ul className="space-y-1">
            <li>• 某些发行版可能需要安装额外的依赖</li>
            <li>• 如果遇到权限问题，使用 sudo</li>
            <li>• 确保你的用户在 npm 的全局目录有写权限</li>
          </ul>
        </InfoBox>

        <h4 className="font-medium text-gray-800 mb-2">验证安装是否成功</h4>
        <p className="text-gray-600 mb-2">安装完成后，打开终端，输入以下命令：</p>
        <CodeBlock
          code={`node --version
npm --version`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
        <p className="text-gray-600">如果显示版本号，说明安装成功了！</p>
      </StepCard>

      <StepCard number="2" title="安装 Claude Code">
        <p className="text-gray-600 mb-4">打开终端，运行以下命令：</p>

        <CodeBlock
          code={`# 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-600 mb-2">如果遇到权限问题，可以使用 sudo：</p>
        <CodeBlock
          code={`sudo npm install -g @anthropic-ai/claude-code`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <h4 className="font-medium text-gray-800 mb-2 mt-4">验证 Claude Code 安装</h4>
        <p className="text-gray-600 mb-2">安装完成后，输入以下命令检查是否安装成功：</p>
        <CodeBlock
          code={`claude --version`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
        <p className="text-gray-600">如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p>
      </StepCard>

      <StepCard number="3" title="设置环境变量">
        <p className="text-gray-600 mb-4">为了让 Claude Code 连接到你的中转服务，需要设置两个环境变量：</p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">方法一：临时设置（当前会话）</h4>
          <p className="text-gray-600 mb-2">在终端中运行以下命令：</p>
          <CodeBlock
            code={`export ANTHROPIC_BASE_URL="${baseUrl}"
export ANTHROPIC_AUTH_TOKEN="${actualApiKey}"`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
          {!apiKey && (
            <InfoBox type="tip">
              <p>💡 记得将 "{actualApiKey}" 替换为在上方显示的实际API密钥。</p>
            </InfoBox>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">方法二：永久设置</h4>
          <p className="text-gray-600 mb-2">编辑你的 shell 配置文件：</p>

          <p className="text-gray-700 font-medium mt-4 mb-2">对于 bash (默认)：</p>
          <CodeBlock
            code={`echo 'export ANTHROPIC_BASE_URL="${baseUrl}"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="${actualApiKey}"' >> ~/.bashrc
source ~/.bashrc`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />

          <p className="text-gray-700 font-medium mt-4 mb-2">对于 zsh：</p>
          <CodeBlock
            code={`echo 'export ANTHROPIC_BASE_URL="${baseUrl}"' >> ~/.zshrc
echo 'export ANTHROPIC_AUTH_TOKEN="${actualApiKey}"' >> ~/.zshrc
source ~/.zshrc`}
            handleCopyCode={handleCopyCode}
            copiedCode={copiedCode}
          />
        </div>

        <h4 className="font-medium text-gray-800 mb-2">验证环境变量设置</h4>
        <p className="text-gray-600 mb-2">设置完环境变量后，可以通过以下命令验证是否设置成功：</p>
        <CodeBlock
          code={`echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <p className="text-gray-600 mb-2">预期输出示例：</p>
        <CodeBlock
          code={`${baseUrl}
cr_xxxxxxxxxxxxxxxxxx`}
          handleCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />

        <InfoBox type="tip">
          <p>💡 如果输出为空，说明环境变量设置失败，请检查并重新设置。</p>
        </InfoBox>
      </StepCard>
    </div>
  );
}