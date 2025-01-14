import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckbox = () => setChecked(!checked);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // This is "destructuring" the value from event.target.elements
    const [emailNode, passwordNode] = event.target.elements
    login(emailNode.value, passwordNode.value).catch(error => {
      console.log(error.message)
      setLoading(false)
    })
  };

  return (
    <form>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={checked ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={checked}
            onChange={handleCheckbox}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton
        onSubmit={handleSubmit}
      >
        <FaSignInAlt />
        <span>{loading ? "Loading" : "Login"}</span>
      </TabsButton>
    </form>
  )
}
