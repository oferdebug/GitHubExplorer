const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } =
	process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
	throw new Error(
		'Missing GitHub OAuth configuration: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_CALLBACK_URL must all be set.',
	);
}

passport.use(
	new GitHubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL: GITHUB_CALLBACK_URL,
		},
		async (accessToken, _refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ githubId: profile.id });
				if (!user) {
					user = await User.create({
						githubId: profile.id,
						username: profile.username,
						displayName:
							profile.displayName || profile.username || '',
						avatarUrl: profile.photos?.[0]?.value || '',
						accessToken,
					});
				} else {
					user.accessToken = accessToken;
					user.avatarUrl =
						profile.photos?.[0]?.value || user.avatarUrl;
					await user.save();
				}
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		},
	),
);

module.exports = passport;
