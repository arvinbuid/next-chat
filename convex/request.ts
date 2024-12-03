import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized ');
    }

    if (args.email === identity.email) {
      throw new ConvexError('Cannot send a request to yourself.');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const receiver = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!receiver) {
      throw new ConvexError('User not found');
    }

    const requestAlreadySent = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) =>
        q.eq('receiver', receiver._id).eq('sender', currentUser._id),
      );

    if (!requestAlreadySent) {
      throw new ConvexError('Request already sent');
    }

    const requestAlreadyReceived = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) =>
        q.eq('receiver', currentUser._id).eq('sender', receiver._id),
      );

    if (!requestAlreadyReceived) {
      throw new ConvexError('This user has already sent you friend request.');
    }

    // If all checks are successful, proceed to create a new request
    const request = await ctx.db.insert('requests', {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return request;
  },
});
