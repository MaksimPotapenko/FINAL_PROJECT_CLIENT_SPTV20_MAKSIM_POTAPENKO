import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { Range, getTrackBackground } from 'react-range'

const STEP = 0.1
const MIN = 0
const MAX = 1000

const PriceRange = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handlePriceRangeChange = (values: number[]) => {
    setPriceChange
    setPriceRange(values)
  }

  return (
    <div className={styles.filters__price}>
      <div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
        <input
          type="text"
          value={Math.ceil(priceRange[0])}
          placeholder="от 00 000"
          readOnly
        />
        <span className={styles.filters__price__inputs__border} />
        <input
          type="text"
          value={Math.ceil(priceRange[1])}
          placeholder="до 10 000"
          readOnly
        />
      </div>
      <Range
        values={this.state.values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: this.state.values,
                  colors: ['#548BF4', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC',
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: '30px' }} id="output">
        {this.state.values[0].toFixed(1)}
      </output>
    </div>
  )
}
export default PriceRange
