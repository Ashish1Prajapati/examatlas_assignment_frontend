import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../api/auth'

const useGetUserInfo = (accessToken) => {
    const [user, setUser] = useState(null)
    const getInfo = async () => {
        const response = await getUserInfo(accessToken)
        if (response?.success) {
            setUser(response.user)
        }
    }
    useEffect(() => {
        getInfo()
    }, [accessToken])

    return { user, setUser }
}

export default useGetUserInfo