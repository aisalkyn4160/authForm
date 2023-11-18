import { useRef, useState } from "react"
import { SECRET_KEY } from "../utils/constants/generals"
import { useNavigate } from "react-router-dom"

const Form = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

    const emailInputValue = useRef()
    const passwordInputValue = useRef()

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredEmail = emailInputValue.current.value
        const enteredPassword = passwordInputValue.current.value

        console.log(enteredEmail, enteredPassword);


        if (isLogin) {
            setIsLoading(true)
            setError(null)

            fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${SECRET_KEY}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.ok) {
                    setIsLoading(false)
                    return res.json()
                }else {
                    return res.json()
                    .then(data => {
                        throw new Error('Пользователь не существует')
                    })    
                }
            })
            .then(data => {
                alert('Вы вошли!');
                localStorage.setItem('token', data.idToken)
                setRegistrationData(data)
                setIsRegistered(true)
                navigate('/home')
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message)
            })

        } else {
            setIsLoading(true)
            setError(null)
            fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${SECRET_KEY}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) =>{ 
                    setIsLoading(false)
                    setError(null)
                    if (res.ok) {
                        return res.json()
                    } else {
                        return res.json()
                        .then(data => {
                            let errorMessage = 'Что-то пошло не так!'

                            if (data && data.error && data.error.message) {
                                errorMessage = data.error.message
                            }
                            throw new Error(errorMessage)
                        })
                    }
                })
            .then(data => {
                console.log(data);
                alert('Вы зарегистрировались!');
                localStorage.setItem('token', data.idToken)
                setRegistrationData(data)
                setIsRegistered(true)
                navigate('/home')
            }).catch(err => {
                setIsLoading(false)
                setError(err.message)
            })
        }

    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={submitHandler}>
                <h2>{isLogin ? 'Войти' : 'Регистрация'}</h2>
                <input ref={emailInputValue} type="email" placeholder="Ваш email" required />
                <input ref={passwordInputValue} type="password" placeholder="Ваш пароль" required />
                <button type="submit">{isLogin ? 'Войти' : 'Регистрация'}</button>
                {isLoading && <p>Загрузка...</p>}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Регистрация' : 'Войти'}</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Form