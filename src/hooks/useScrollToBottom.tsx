import { useEffect } from "react"

const reachedBottom = (element: HTMLDivElement) => {
    return element.getBoundingClientRect().bottom <= window.innerHeight
}

const useScrollToBottom = (element: HTMLDivElement | null, callback: () => void) => {
    useEffect(() => {
        let lastScrollTop = window.scrollY;

        const handleScroll = () => {
            var scrollTop = window.pageYOffset;
            const isScrollingDown = scrollTop > lastScrollTop;
            if (isScrollingDown && element && reachedBottom(element)) {
                callback()
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
     }, [element, callback]);
}

export default useScrollToBottom;