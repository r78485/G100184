Param(
  [switch]$Prod
)

Write-Host "Installing dependencies..."
if (Test-Path "pnpm-lock.yaml") {
  pnpm install
} else {
  npm install
}

Write-Host "Building..."
pnpm build

Write-Host "Deploying to Vercel..."
if ($Prod) {
  vercel --prod --confirm
} else {
  vercel --confirm
}

Write-Host "Done."
