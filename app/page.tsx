"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Github, Download, Radio, MapPin, Users, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [starCount, setStarCount] = useState<number | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [releaseInfo, setReleaseInfo] = useState<{
    version: string
    size: string
  } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const gradientTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {

    const fetchRepoData = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/bloxstraplabs/bloxstrap")
        if (response.ok) {
          const data = await response.json()
          setStarCount(data.stargazers_count)
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error)
      }
    }


    const fetchLatestRelease = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/bloxstraplabs/bloxstrap/releases/latest")
        if (response.ok) {
          const data = await response.json()

          const exeAsset = data.assets.find((asset: any) => asset.name.endsWith(".exe"))
          if (exeAsset) {
            setDownloadUrl(exeAsset.browser_download_url)


            const version = data.tag_name.replace(/^v/, "")


            const sizeInMB = (exeAsset.size / (1024 * 1024)).toFixed(1)

            setReleaseInfo({
              version: version,
              size: `${sizeInMB} MB`,
            })
          }
        }
      } catch (error) {
        console.error("Failed to fetch latest release:", error)
      }
    }

    fetchRepoData()
    fetchLatestRelease()


    const handleScroll = () => {

      setScrolled(window.scrollY > 10)


      if (gradientTextRef.current) {
        const scrollPosition = window.scrollY
        const hue = (scrollPosition / 5) % 360
        gradientTextRef.current.style.backgroundImage = `linear-gradient(90deg, #ff56c1 ${hue}%, #9b6bff ${(hue + 60) % 360}%, #56c1ff ${(hue + 120) % 360}%)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-black/50 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Bloxstrap Logo" width={32} height={32} />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Bloxstrap
            </span>
          </div>
          <div>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 border-0 text-white font-medium px-4"
            >
              <Link href={downloadUrl || "https://github.com/bloxstraplabs/bloxstrap/releases/latest"}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-600/20 via-transparent to-transparent"></div>

          <div className="container relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <div className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-sm font-semibold bg-black/30 backdrop-blur-sm">
                  <Github className="mr-2 h-3.5 w-3.5" />
                  <Link
                    href="https://github.com/bloxstraplabs/bloxstrap"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center"
                  >
                    <span className="text-gray-300">bloxstraplabs/bloxstrap</span>
                    <div className="ml-2 flex items-center gap-0.5">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-white">
                        {starCount !== null ? starCount.toLocaleString() : "Loading..."}
                      </span>
                    </div>
                  </Link>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Making Roblox a{" "}
                  <span
                    ref={gradientTextRef}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-size-200 animate-gradient"
                  >
                    little bit better
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-[600px]">
                  An alternative replacement for the standard Roblox launcher that allows for the easy configuration of
                  file mods and other extra useful functionality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 border-0 text-white font-medium shadow-lg shadow-pink-500/20 w-auto px-6"
                    >
                      <Link href={downloadUrl || "https://github.com/bloxstraplabs/bloxstrap/releases/latest"}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Link>
                    </Button>
                    {releaseInfo && (
                      <span className="text-xs text-gray-400 mt-1 text-center">
                        v{releaseInfo.version} • {releaseInfo.size}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-white/20 bg-black/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                  >
                    <Link href="https://github.com/bloxstraplabs/bloxstrap" target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative lg:order-last pt-8 lg:pt-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
                <div className="relative mx-auto max-w-[550px]">
                  <div className="absolute -top-12 -left-1 h-40 w-40 bg-pink-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-8 -right-1 h-40 w-40 bg-violet-500/20 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RonQBhE2vHeKSWnXQahJERTj1lAeQP.png"
                      width={800}
                      height={600}
                      alt="Bloxstrap in action showing mods interface and Roblox UI"
                      className="rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-gray-950 to-black" id="features">
          <div className="container">
            <div className="text-center mb-12 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Key Features
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-[700px] mx-auto">
                Bloxstrap enhances your Roblox experience with powerful customization options and quality-of-life
                improvements.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div
                className="flex flex-col p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm animate-fade-up"
                style={{ animationDelay: "400ms" }}
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-pink-500/10 mb-4">
                  <Github className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Open-source on GitHub</h3>
                <p className="text-gray-300 flex-1">
                  See what makes it tick, or contribute something useful. We also handle bug reports and feature
                  requests here.
                </p>
              </div>
              <div
                className="flex flex-col p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm animate-fade-up"
                style={{ animationDelay: "500ms" }}
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-violet-500/10 mb-4">
                  <Radio className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Discord Rich Presence</h3>
                <p className="text-gray-300 flex-1">
                  Let your friends know at a glance what you're playing, with support for integration by game
                  developers.
                </p>
              </div>
              <div
                className="flex flex-col p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm animate-fade-up"
                style={{ animationDelay: "600ms" }}
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-500/10 mb-4">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Server location information</h3>
                <p className="text-gray-300 flex-1">
                  Makes server hopping just that little bit easier, making it easy to see roughly where your server is
                  located.
                </p>
              </div>
              <div
                className="flex flex-col p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm animate-fade-up"
                style={{ animationDelay: "700ms" }}
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-500/20 to-green-500/10 mb-4">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Rich modding community</h3>
                <p className="text-gray-300 flex-1">
                  Browse all the file mods that people are making and publishing to the Bloxstrap Discord server.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-black/50 border-y border-white/10">
          <div className="container">
            <div
              className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left animate-fade-up"
              style={{ animationDelay: "750ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-white">Having a problem with something?</div>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-black/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                <Link href="https://github.com/bloxstraplabs/bloxstrap/wiki" target="_blank" rel="noreferrer">
                  See the Wiki
                </Link>
              </Button>
            </div>

            <div
              className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6 text-center md:text-left animate-fade-up"
              style={{ animationDelay: "800ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-yellow-500/10">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-white">Problem still not resolved?</div>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-black/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                <Link href="https://github.com/bloxstraplabs/bloxstrap/issues/new" target="_blank" rel="noreferrer">
                  Please open an issue
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-black to-gray-950" id="about">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="animate-fade-up" style={{ animationDelay: "850ms" }}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  About Bloxstrap
                </h2>
                <div className="mt-4 space-y-4 text-gray-300">
                  <p>
                    Bloxstrap is an open-source alternative to the standard Roblox launcher that provides enhanced
                    functionality and customization options for players who want more control over their Roblox
                    experience.
                  </p>
                  <p>
                    With Bloxstrap, you can easily configure file mods, restore classic features, and enjoy various
                    quality-of-life improvements that aren't available in the official launcher.
                  </p>
                  <p>
                    As an open-source project, Bloxstrap is continuously evolving with contributions from the community.
                    Join us on GitHub to contribute or stay updated with the latest features.
                  </p>
                </div>
              </div>
              <div
                className="p-8 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm animate-fade-up"
                style={{ animationDelay: "900ms" }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Getting Started</h3>
                <ol className="space-y-4 list-decimal list-inside text-gray-300">
                  <li>
                    <span className="font-medium text-white">Download Bloxstrap</span>
                    <p className="pl-6 mt-1 text-gray-400">Get the latest release from the GitHub repository.</p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Install and launch</span>
                    <p className="pl-6 mt-1 text-gray-400">Run the installer and follow the on-screen instructions.</p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Configure your mods</span>
                    <p className="pl-6 mt-1 text-gray-400">
                      Use the simple interface to enable and configure the mods you want.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Enjoy a better Roblox</span>
                    <p className="pl-6 mt-1 text-gray-400">
                      Launch Roblox through Bloxstrap and experience the improvements.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-20 bg-gradient-to-r from-pink-600 to-violet-600 animate-fade-up"
          style={{ animationDelay: "1000ms" }}
        >
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white">
              Ready to enhance your Roblox experience?
            </h2>
            <p className="text-xl max-w-[600px] mx-auto mb-8 text-white/90">
              Download Bloxstrap today and join thousands of players enjoying a better Roblox experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex flex-col">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-violet-600 hover:bg-gray-100 border-0 font-medium shadow-lg shadow-black/20 w-auto px-6"
                >
                  <Link href={downloadUrl || "https://github.com/bloxstraplabs/bloxstrap/releases/latest"}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Link>
                </Button>
                {releaseInfo && (
                  <span className="text-xs text-white/70 mt-1 text-center">
                    v{releaseInfo.version} • {releaseInfo.size}
                  </span>
                )}
              </div>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/40 hover:border-white"
                asChild
              >
                <Link href="https://github.com/bloxstraplabs/bloxstrap" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-6 bg-black animate-fade-up" style={{ animationDelay: "1100ms" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 font-semibold">
            <Image src="/logo.png" alt="Bloxstrap Logo" width={20} height={20} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Bloxstrap
            </span>
          </div>
          <p className="text-sm text-gray-400">
            <Link
              href="https://github.com/bloxstraplabs/bloxstrap/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              An open-source project licensed under the MIT License.
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/bloxstraplabs/bloxstrap"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
