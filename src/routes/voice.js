module.exports = (router, voiceCallController) => {

    router.post("/voiceCall", voiceCallController.incomingCall);
    router.post("/voiceMail", voiceCallController.handleVoiceMail)

}