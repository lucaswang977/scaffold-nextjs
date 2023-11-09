import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export { cn, delay }
