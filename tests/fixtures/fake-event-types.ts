// fixtures/fake-event-types.ts
export type FakeEventType = Record<string, any>;

export function generateFakeEventTypes(count: number): FakeEventType[] {
   const list: FakeEventType[] = [];

  for (let i = 0; i < count; i++) {
    list.push({
      id: 1000000 + i,
      teamId: null,
      schedulingType: null,
      userId: 1928186,
      metadata: {},
      description: `Desc ${i}`,
      interfaceLanguage: null,
      hidden: false,
      slug: `fake-event-${i}`,
      length: 30,
      title: `Fake Event ${i}`,
      requiresConfirmation: false,
      canSendCalVideoTranscriptionEmails: true,
      requiresConfirmationForFreeEmail: false,
      requiresConfirmationWillBlockSlot: false,
      autoTranslateDescriptionEnabled: false,
      position: i,
      offsetStart: 0,
      owner: { timeZone: "Europe/Kiev" },
      profileId: null,
      eventName: null,
      parentId: null,
      timeZone: null,
      periodType: "UNLIMITED",
      periodStartDate: null,
      periodEndDate: null,
      periodDays: null,
      periodCountCalendarDays: null,
      lockTimeZoneToggleOnBookingPage: false,
      lockedTimeZone: null,
      requiresBookerEmailVerification: false,
      disableGuests: false,
      disableCancelling: false,
      disableRescheduling: false,
      allowReschedulingCancelledBookings: false,
      hideCalendarNotes: false,
      minimumBookingNotice: 120,
      beforeEventBuffer: 0,
      afterEventBuffer: 0,
      seatsPerTimeSlot: null,
      onlyShowFirstAvailableSlot: false,
      allowReschedulingPastBookings: false,
      hideOrganizerEmail: false,
      showOptimizedSlots: false,
      seatsShowAttendees: false,
      seatsShowAvailabilityCount: true,
      scheduleId: null,
      instantMeetingScheduleId: null,
      price: 0,
      currency: "usd",
      slotInterval: null,
      successRedirectUrl: null,
      isInstantEvent: false,
      instantMeetingExpiryTimeOffsetInSeconds: 90,
      instantMeetingParameters: [],
      aiPhoneCallConfig: null,
      assignAllTeamMembers: false,
      isRRWeightsEnabled: false,
      rescheduleWithSameRoundRobinHost: false,
      recurringEvent: null,
      locations: [{ type: "integrations:google:meet" }],
      bookingFields: null,
      useEventTypeDestinationCalendarEmail: false,
      secondaryEmailId: null,
      bookingLimits: null,
      durationLimits: null,
      eventTypeColor: null,
      hideCalendarEventDetails: false,
      rrSegmentQueryValue: null,
      assignRRMembersUsingSegment: false,
      maxLeadThreshold: null,
      useEventLevelSelectedCalendars: false,
      customReplyToEmail: null,
      restrictionScheduleId: null,
      useBookerTimezone: false,
      instantMeetingSchedule: null,
      hashedLink: [],
      users: [
        {
          name: "Fake User",
          avatarUrl: null,
          username: "fakeuser",
          id: 1928186,
          timeZone: "Europe/Kiev",
          nonProfileUsername: "fakeuser",
          profile: {
            id: null,
            upId: "usr-1928186",
            username: "fakeuser",
            organizationId: null,
            organization: null
          }
        }
      ],
      children: [],
      hosts: [],
      team: null,
      safeDescription: `<p>Desc ${i}</p>\n`
    });
  }

  return list;
}

export const fakeLongDescriptionEvent: FakeEventType = {
  id: 1,
  title: "Ванда ".repeat(20), // очень длинный title
  description: "Ванда ".repeat(20),
  safeDescription: "Ванда ".repeat(20),
  slug: 'long-description-event',
  length: 30,
  teamId: null,
  schedulingType: null,
  userId: 1928186,
  metadata: {},
  hidden: false,
  position: 0,
  owner: { timeZone: "Europe/Kiev" },
  users: [],
  children: [],
  hosts: [],
  locations: [],
};


