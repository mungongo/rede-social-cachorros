export const API_URL = 'http://dogsapi.test/json';

export function TOKEN_POST(body:any){
    return{
        url:API_URL +'/jwt-auth/v1/token',
        options:{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body),
        }
    }
}

export function TOKEN_VALIDATE_POST(token:any){
    return{
        url:API_URL +'/jwt-auth/v1/token/validate',
        options:{
            method:'POST',
            headers:{
                Authorization :'Bearer' + token,
            }
        }
    }
}

export function USUARIO_GET(token:any){
    return{
        url:API_URL +'/api/user',
        options:{
            method:'GET',
            headers:{
                Authorization :'Bearer' + token,
            }
        }
    }
}

export function USUARIO_POST(body:any){
    return{
        url:API_URL +'/api/user',
        options:{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body),
        }
    }
}

export function PHOTO_POST(formData:any,token:any){
    return{
        url:API_URL +'/api/photo',
        options:{
            method:'POST',
            headers:{
                Authorization :'Bearer' + token,
            },
            body:formData,
        }
    }
}
export function PHOTOS_GET({ page, total, user }:any) {
    const userParam = user ? `&_user=${user}` : ""; // Só adiciona se `user` existir
    return {
        url: `http://dogsapi.test/json/api/photo/?_page=${page}&_total=${total}${userParam}`,
        options: {
            method: "GET",
        },
    };
}


export function FOTO_GET(id:any){
    return{
        url: `${API_URL}/api/photo/${id}`,
    }
}
export function PHOTO_GET(id:any){
    return{
        url: `${API_URL}/api/photo/${id}`,
        options:{
            method:'GET',
            cache:'no-store'
        }
    }
}
export function COMMENTS_POST(id:any,body:any){
    return{
        url:API_URL +`/api/comment/${id}`,
        options:{
            method:'POST',
            headers:{
                Authorization :'Bearer' + window.localStorage.getItem('token'),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body),
        }
    }
}

export function PHOTO_DELETE(id:any){
    return{
        url:API_URL +`/api/photo/${id}`,
        options:{
            method:'DELETE',
            headers:{
                Authorization :'Bearer' + window.localStorage.getItem('token'),
            },
        }
    }
}

export function PASSWORD_LOST(body:any){
    return{
        url:API_URL +'/api/password/lost',
        options:{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body),
        }
    }
}

export function PASSWORD_RESET(body:any){
    return{
        url:API_URL +'/api/password/reset',
        options:{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body),
        }
    }
}

export function STATS_GET(){
    return{
        url:API_URL +'/api/status',
        options:{
            method:'GET',
            headers:{
                Authorization :'Bearer' + window.localStorage.getItem('token'),
            }
        }
    }
}