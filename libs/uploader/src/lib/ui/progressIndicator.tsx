import { FileRemoveReason } from '@uppy/core'
import { useState } from 'react'

interface Props {
  id: string;
  state: string;
  percentage: number;
  onAction: ({
    id,
    action,
    reason,
  }: {
    id: string;
    action: string;
    reason: FileRemoveReason;
  }) => void;
}

const progressIndicator = ({
  id,
  state,
  percentage,
  onAction,
}: Props): JSX.Element => {
  const [circleLength] = useState(126.24778) // 2 * Math.PI * 15
  const action = () => {
    // ['preprocessing', 'pending'].includes(state) && onAction({ id, action: 'cancel' })
    console.log('action', id, state, percentage)
    if (
      state === 'preprocessing' ||
      state === 'pending' ||
      state === 'complete'
    ) {
      return
    }
    let type = null
    switch (state) {
      case 'error':
        type = 'retry'
        break
      default:
        type = 'cancel'
    }
    onAction({ id: id, action: type, reason: 'removed-by-user' })
  }
  return (
    <>
      {state !== 'complete' && (
        <div className={`item-progress ${state}`}>
          <button
            className="reset uppy-DashboardItem-progressIndicator"
            type="button"
            aria-label="Cancel upload"
            title="Cancel upload"
            onClick={() => action()}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="50px"
              height="50px"
              viewBox="0 0 50 50"
              className="UppyIcon UppyIcon-progressCircle"
            >
              <g transform="translate(25, 25)">
                <circle
                  className="bg-main"
                  cx="0"
                  cy="0"
                  r="25"
                  fill="rgba(0, 0, 0, .7)"
                />
                <circle
                  className="bg"
                  cx="0"
                  cy="0"
                  r="20"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  className="percentage"
                  cx="0"
                  cy="0"
                  r="20"
                  transform="rotate(-90)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={circleLength}
                  strokeDashoffset={
                    circleLength - (circleLength / 100) * percentage || 0
                  }
                />
                <circle
                  className="preprocess"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="110"
                  strokeDashoffset="0"
                  cx="0"
                  cy="0"
                  r="20"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="360;140"
                    dur="2.2s"
                    keyTimes="0;1"
                    calcMode="spline"
                    fill="freeze"
                    keySplines="0.41,0.314,0.8,0.54"
                    repeatCount="indefinite"
                    begin="0"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0;274;360"
                    keyTimes="0;0.74;1"
                    calcMode="linear"
                    dur="2.2s"
                    repeatCount="indefinite"
                    begin="0"
                  />
                </circle>
              </g>
              <g className="cancel">
                <polygon
                  transform="translate(9, 9)"
                  points="19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
                />
              </g>
              <g transform="translate(13, 13)" className="retry">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </g>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default progressIndicator
