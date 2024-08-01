import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children, roles}) => {
    const {isUserLogin, user} = useSelector((state) => state.auth);

    if(!isUserLogin) return <Navigate to="/login"/>
    if(!roles || !Array.isArray(roles) || !roles.includes(user.role)) return  <Navigate to="/unauthorized"/>
    /*  eğer kulllanıcı rolü yoksa veya role den gelen role bilgisi istenilen roles yapısını içermiyorsa unauthorize sayfasına 
    yönlendirmemiz lazım. */

  return children;/* eğer tüm kontrollerden geçtiyse childrene dön. bize children dan ne geliyor. Sayfa adı.  */
}

export default PrivateRoute;