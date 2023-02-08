const cookieToken = async (user, res) => {
    const token = await user.getjwtToken()
    let goto
    if (user.admin) {
        goto = '/Admin/facilitators'
    } else if (user.facilitator) {
        goto = '/Facilitator/facilitator'
    } else {
        goto = '/login'
    }
    const options = {
        expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    }
    return res.cookie('token', token, options).redirect(`${goto}`)
}
module.exports = cookieToken