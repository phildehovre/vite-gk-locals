import React from 'react'
// import './Section.scss'

function Section(props: {
    children: React.ReactNode
    flexDirection?: string | undefined
    display?: string
    height?: string
    bkg?: string
    centered?: boolean,
    margin?: string

}) {

    const { flexDirection, display, height, bkg, centered, margin } = props

    const styles: object = {
        flexDirection: flexDirection,
        display: display,
        height: height,
        backgroundColor: `var(${bkg}`,
        margin: margin
    }


    return (
        <div
            className={
                `section-ctn 
            ${centered ? 'centered' : ''}s
            `}
            style={styles} > {props.children}</div>
    )
}

export default Section