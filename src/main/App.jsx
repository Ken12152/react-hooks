import React, { 
    useState, 
    useEffect, 
    useRef, 
    useMemo,
    useCallback
} from 'react'

import PageHeader from '../component/pageHeader'
import PageContent from '../component/pageContent'
import IncButton from './incButton'

export default props => {
    const [number, setNumber] = useState(0)
    const [factorial, setFactorial] = useState(0)
    const [evenOdd, setEvenOdd] = useState('')

    const xfactorial = n => { 
        n = parseInt(n)
        if(n === 0) { return 1 } else if(n < 0) { return -1 }
        return xfactorial(n - 1) * n
    }

    useEffect(() => {
        if(number) {
            setFactorial(xfactorial(number <= 12 ? number : -1))
            setEvenOdd(number % 2 === 0 ? 'Even' : 'Odd')
        } else {
            setEvenOdd('NaN')
        }
    }, [number])


    /* --------------- useRef --------------- */
    const renderCount = useRef(0)


    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')

    const [textMerge, setTextMerge] = useState('')

    const input1 = useRef(null)
    const input2 = useRef(null)

    useEffect(() => input2.current.focus(), [text1])

    useEffect(() => input1.current.focus(), [text2])

    // useEffect(() => {
    //     setTextMerge([...text1].map((e, i) => `${e}${text2[i] || ''}`).join(''))
    // }, [text1, text2])

    // useEffect(() => setTextMerge([...text1].map((e, i) => `${e}${text2[i] || ''}`).join('')), [text1, text2])

    const merge = (str1, str2) => [...str1].map((e, i) => `${e}${str2[i] || ''}`).join('')
    useEffect(() => setTextMerge(merge(text1, text2)), [text1, text2])


    /* --------------- useMemo --------------- */
    const [x1, setX1] = useState(0)
    const [x2, setX2] = useState(0)
    const [x3, setX3] = useState(0)

    const sum = (n1, n2) => {
        const future = Date.now() + 1000
        while(Date.now() < future) {}
        return n1 + n2
    }

    // const [Xsum, setXsum] = useState(0)
    // useEffect(() => setXsum(sum(x1, x2)), [x1, x2])

    let Xsum = useMemo(() => sum(x1, x2), [x1, x2])


    /* --------------- useCallback --------------- */
    const [call, setCall] = useState(0)
    // const incFunc = (x) => setCall(call + x)

    const incFunc = useCallback((inc) => setCall(curV => curV + inc), [setCall])


    /* --------------- useCallback --------------- */

    return(
        <div>
            <h1>React Hooks</h1>

            <PageHeader title="useEffect" color="#149877" />
            <PageContent>
                <span>useState:</span>
                <input type="number" value={number} onChange={ e => setNumber(e.target.value) } />
                <span>Factorial:</span>
                <input type="number" value={factorial} />
                <span>Status:</span>
                <input type="text" value={evenOdd} />
            </PageContent>

            <PageHeader title="useRef" color="#149877" />
            <PageContent>
                <span>renderCount: {renderCount.current}</span>
                <button onClick={ () => renderCount.current++ }>renderCount++</button>
                <button onClick={ () => setNumber(number === 0 ? '' : 0) }>Update</button>
            </PageContent>

            <PageHeader title="useRef" color="#149877" />
            <PageContent>
                <input ref={input1} type="text" value={text1} onChange={ (e) => setText1(e.target.value) } />
                <input ref={input2} type="text" value={text2} onChange={ (e) => setText2(e.target.value) } />
                <span>Merge:</span>
                <input type="text" value={textMerge} onChange={ (e) => setTextMerge(e.target.value) } />
            </PageContent>

            <PageHeader title="useMemo" color="#149877" />
            <PageContent>
                <input type="number" value={x1} onChange={ (e) => setX1(parseInt(e.target.value)) } />
                <input type="number" value={x2} onChange={ (e) => setX2(parseInt(e.target.value)) } />
                <input type="number" value={x3} onChange={ (e) => setX3(parseInt(e.target.value)) } />
                <span>Sum:</span>
                <input type="number" value={Xsum} />
            </PageContent>

            <PageHeader title="useCallback" color="#149877" />
            <PageContent>
                <IncButton value={5} inc={incFunc} />
                <span>{call}</span>
            </PageContent>
        </div>
    )
}
