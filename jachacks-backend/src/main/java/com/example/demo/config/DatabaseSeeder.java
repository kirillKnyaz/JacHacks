package com.example.demo.config;

import com.example.demo.entity.InterestEntity;
import com.example.demo.entity.OrganizationEntity;
import com.example.demo.entity.OrganizationInterestEntity;
import com.example.demo.repository.InterestRepository;
import com.example.demo.repository.OrganizationInterestRepository;

import com.example.demo.repository.OrganizationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;
import java.util.Random;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedDatabase(
            InterestRepository interestRepository,
            OrganizationRepository organizationRepository,
            OrganizationInterestRepository organizationInterestRepository) {
        return args -> {

            if (interestRepository.count() == 0) {
                List<String> interests = List.of(
                        "Education", "Health & Medicine", "Environment", "Animal Welfare",
                        "Arts & Culture", "Science & Research", "Disaster Relief", "Poverty Alleviation",
                        "Hunger & Nutrition", "Housing & Shelter", "Clean Water Access", "Human Rights",
                        "Children & Youth", "Elderly Support", "Mental Health", "Gender Equality",
                        "Indigenous Communities", "Community Development", "Technology Access", "Sports & Recreation"
                );

                for (String interestName : interests) {
                    InterestEntity interest = new InterestEntity();
                    interest.setName(interestName);
                    interestRepository.save(interest);
                }
            }

            if (organizationRepository.count() == 0) {
                List<String> organizations = List.of(
                        "Save the Children", "Red Cross", "World Wildlife Fund (WWF)",
                        "Médecins Sans Frontières", "Greenpeace", "Habitat for Humanity",
                        "Amnesty International", "Feeding America", "Water.org", "Special Olympics"
                );

                for (String orgName : organizations) {
                    OrganizationEntity org = new OrganizationEntity();
                    org.setName(orgName);
                    org.setDescription(orgName + " description goes here.");
                    organizationRepository.save(org);
                }
            }

            if (organizationInterestRepository.count() == 0) {
                List<OrganizationEntity> allOrgs = organizationRepository.findAll();
                List<InterestEntity> allInterests = interestRepository.findAll();
                Random random = new Random();

                for (OrganizationEntity org : allOrgs) {
                    // Assign 2-3 random interests per organization
                    for (int i = 0; i < 3; i++) {
                        InterestEntity randomInterest = allInterests.get(random.nextInt(allInterests.size()));

                        OrganizationInterestEntity link = new OrganizationInterestEntity();
                        link.setOrganization(org);
                        link.setInterest(randomInterest);
                        organizationInterestRepository.save(link);
                    }
                }
            }

        };
    }
}

