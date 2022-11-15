import { render } from "@testing-library/react"

import Uploader, { AttachmentProps } from "./uploader"

describe("Uploader", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Uploader onChange={function (value: AttachmentProps | AttachmentProps[]): void {
      throw new Error("Function not implemented.")
    } } OnGeneratedThumbnail={function (): void {
      throw new Error("Function not implemented.")
    } } />)
    expect(baseElement).toBeTruthy()
  })
})
