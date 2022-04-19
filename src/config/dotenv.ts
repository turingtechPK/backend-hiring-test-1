try{
    require('dotenv').config({ silent: true })
}catch(err) {
    console.log('env import error')
    // pass
}