const cookieToken = async (user, res) => {
    const token = await user.getjwtToken()
    let goto
    if (user.admin) {
        goto = '/Admin/Admin-Facilitators'
    } else if (user.facilitator) {
        goto = '/Facilitator/Facilitator'
    } else {
        goto = '/login'
    }
    const options = {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000 ),
        httpOnly: true
    }
    return res.cookie('token', token, options).redirect(`${goto}`)
}
module.exports = cookieToken