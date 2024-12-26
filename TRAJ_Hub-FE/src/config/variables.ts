export const negativeValueIsPositiveEffect = [
    'Hipfire Max Spread',
    'Hipfire Min Spread',
    'Recoil Gun Kick',
    'Vertical Recoil Control',
    'Horizontal Recoil Control',
    'Reload Quickness',
    'Empty Reload Quickness',
    'Aim Down Sight Speed',
    'Sprint to Fire Speed',
    'Slide to Fire Speed',
    'Weapon Swap Speed',
    "Mini Map Firing Ping"
  ];
  
  export const weapontypes = [
    "assault rifle",
		"battle rifle",
		"lmg",
		"marksman rifle",
		"pistols",
		"shotgun",
		"smg",
		"sniper rifle"
  ];
  
  export const parameters = [
    "Damage",
    "Range",
    "Accuracy",
    "Mobility",
    "Handling",
  ];
  
  export const backend_url = "https://traj-hub.onrender.com";
  // export const backend_url = "http://127.0.0.1:5000";


  export const test_data = {
    "SO-14": {
      "Overall tier": "A",
      attachments: {
        ammunition: {
          name: "7.62X51mm High Velocity",
          stats: {
            "Bullet Velocity": "+20%",
            Range: "-5%",
          },
        },
        laser: {
          name: "SL Razorhawk Laser Light",
          stats: {
            "ADS Time": "-10.3%",
            "Sprint to Fire": "-13%",
            "Tac Spread": "-19%",
          },
        },
        muzzle: {
          name: "Quartermaster Suppressor",
          stats: {
            "ADS Time": "+8%",
            "Gun Kick": "-10%",
            "Horiz. Recoil": "-23%",
            "Sprint to Fire": "+6%",
            "Vert. Recoil": "-10%",
          },
        },
        optic: {
          name: "Intlas CAS-14",
          stats: {
            "Default Zoom": "1.18x",
            "Max Hipfire Area": "-10%",
            "Min Hipfire Area": "-10%",
            "Tac Spread": "-23.5%",
          },
        },
        underbarrel: {
          name: "FTAC RS-9 Stealth Angled Grip",
          stats: {
            "Gun Kick": "-0.3%",
            "Horiz. Recoil": "-8.4%",
            "Tac Spread": "-16.8%",
            "Vert. Recoil": "+2.8%",
          },
        },
      },
      "parameter grades": {
        Accuracy: {
          original: "C",
          revised: "A",
        },
        Damage: {
          original: "A",
          revised: "A",
        },
        Handling: {
          original: "S",
          revised: "S",
        },
        Mobility: {
          original: "S",
          revised: "S",
        },
        Range: {
          original: "C",
          revised: "A",
        },
      },
      stats: {
        "ADS Mov. Speed": {
          original: "1.8 m/s",
          revised: "1.8 m/s",
        },
        "ADS Time": {
          original: "302 ms",
          revised: 292.56552000000005,
        },
        "Bullet Velocity": {
          original: "790 m/s",
          revised: 948.0,
        },
        Crouch: {
          original: "2.1 m/s",
          revised: "2.1 m/s",
        },
        "Flinch Resist": {
          original: "0.2 N",
          revised: "0.2 N",
        },
        "Gun Kick": {
          original: "29.70°/s",
          revised: 26.64981,
        },
        "Hitscan Range": {
          original: "39.5 m",
          revised: "39.5 m",
        },
        "Horiz. Recoil": {
          original: "7.35°/s",
          revised: 5.184102,
        },
        "Mag Size": {
          original: "20 Rounds",
          revised: "20 Rounds",
        },
        "Max Hipfire": {
          original: "10.5 deg.",
          revised: "10.5 deg.",
        },
        "Min Hipfire": {
          original: "2.3 deg.",
          revised: "2.3 deg.",
        },
        "Movement Speed": {
          original: "4.6 m/s",
          revised: "4.6 m/s",
        },
        RPM: {
          original: "546 RPM",
          revised: "546 RPM",
        },
        "Reload Time": {
          original: "3 s",
          revised: "3 s",
        },
        Sprint: {
          original: "5.8 m/s",
          revised: "5.8 m/s",
        },
        "Sprint To Fire": {
          original: "307 ms",
          revised: "307 ms",
        },
        "Swap Speed": {
          original: "1600 ms",
          revised: "1600 ms",
        },
        "Tac Spread": {
          original: "3.8 deg.",
          revised: 1.95908544,
        },
        "Tac Sprint": {
          original: "7 m/s",
          revised: "7 m/s",
        },
        "Tac Sprint To Fire": {
          original: "0 ms",
          revised: "0 ms",
        },
        "Target Flinch": {
          original: "0.8 N",
          revised: "0.8 N",
        },
        "Vert. Recoil": {
          original: "40.26°/s",
          revised: 37.248552000000004,
        },
        Zoom: {
          original: "1 x",
          revised: "1 x",
        },
      },
      type: "Battlerifle",
    },
  };
  