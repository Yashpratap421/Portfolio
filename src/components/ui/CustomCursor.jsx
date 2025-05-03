import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
    const cursor = useRef(null);
    const cursorDot = useRef(null);
    const cursorCircle = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            // Move the cursor dot and circle to follow mouse position
            gsap.to(cursorDot.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });

            gsap.to(cursorCircle.current, {
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleMouseLeave = () => {
            // Instantly hide cursor on mouse leave
            gsap.set(cursor.current, { opacity: 0 });
        };

        const handleMouseEnter = (e) => {
            // Instantly show cursor and snap to mouse position
            gsap.set(cursor.current, { opacity: 1 });
            gsap.set([cursorDot.current, cursorCircle.current], {
                x: e.clientX,
                y: e.clientY,
            });
        };

        // Hover effect for buttons with `.btn` class
        const buttons = document.querySelectorAll('.btn');

        const handleButtonHover = (e) => {
            // Get the mouse position relative to the button
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            // Apply movement effect to the button
            //   gsap.to(e.target, {
            //     x: x * 0.15,
            //     y: y * 0.15,

            //   });
            buttons.style.transform = `translate(${moveX}px, ${moveY}px)`;

            //   // Grow cursor dot size
            gsap.to(cursorDot.current, {
                width: '55px',
                height: '55px',
            });
        };

        const handleButtonLeave = () => {
            // Reset cursor size on button hover end
            gsap.to(cursorDot.current, {
                width: '10px',
                height: '10px',
            });
        };

        // Add event listeners for buttons
        buttons.forEach(button => {
            button.addEventListener('mousemove', handleButtonHover);
            button.addEventListener('mouseleave', handleButtonLeave);
        });

        // Add event listeners for cursor movement
        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        // Cleanup listeners on component unmount
        return () => {
            buttons.forEach(button => {
                button.removeEventListener('mousemove', handleButtonHover);
                button.removeEventListener('mouseleave', handleButtonLeave);
            });
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <div ref={cursor} className="custom-cursor">
            <div ref={cursorDot} className="cursor-dot"></div>
            <div ref={cursorCircle} className="cursor-circle"></div>
        </div>
    );
};

export default CustomCursor;
