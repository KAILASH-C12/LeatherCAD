import * as React from "react"

export function cn(...inputs) {
    return inputs.filter(Boolean).join(" ")
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    // Simplified without 'cva' or '@radix-ui/react-slot'
    let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    let variantStyles = ""
    if (variant === "default") variantStyles = "bg-white text-black hover:bg-white/90"
    if (variant === "destructive") variantStyles = "bg-red-500 text-white hover:bg-red-600"
    if (variant === "outline") variantStyles = "border border-white/20 bg-transparent hover:bg-white/10 text-white"
    if (variant === "secondary") variantStyles = "bg-stone-800 text-white hover:bg-stone-800/80"
    if (variant === "ghost") variantStyles = "hover:bg-white/10 text-white"
    if (variant === "link") variantStyles = "text-white underline-offset-4 hover:underline"

    let sizeStyles = ""
    if (size === "default") sizeStyles = "h-10 px-4 py-2"
    if (size === "sm") sizeStyles = "h-9 rounded-md px-3"
    if (size === "lg") sizeStyles = "h-11 rounded-md px-8"
    if (size === "icon") sizeStyles = "h-10 w-10"

    const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className || ""}`

    return (
        <button
            className={combinedClassName}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
