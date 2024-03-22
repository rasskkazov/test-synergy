import type { UserType } from ".."
import "./User.scss"
export const User = (props: UserType) => {
  return (
    <div className="user">
      <img
        src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"
        alt="user"
      />
      {`${props.name ?? ""} ${props.surname ?? ""}`}
    </div>
  )
}
